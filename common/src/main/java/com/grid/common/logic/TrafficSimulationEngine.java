package com.grid.common.logic;

import com.grid.common.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class
TrafficSimulationEngine {

    private List<Road> roads;
    private List<Car> cars;
    private Random random;
    private SimulationParams currentParams;

    // --- Statistiques cumulées pour le résultat final ---
    private int totalJamsDetected;
    private double sumOfAverageSpeeds;
    private int iterationsExecuted;

    // Stats avancées (Monte Carlo)
    private double minGlobalSpeed;
    private double maxGlobalSpeed;
    private int totalAccidents;

    // Compteur pour la Heatmap (Combien de fois chaque route a été bouchée)
    private Map<String, Integer> roadCongestionCounter;

    /**
     * Initialise la simulation en créant la ville et les voitures.
     * Reset des compteurs statistiques.
     */
    public void initializeSimulation(SimulationParams params) {
        this.currentParams = params;
        this.random = new Random(params.getSeed());

        // Création dynamique de la grille
        int size = (params.getGridSize() > 0) ? params.getGridSize() : 5;
        this.roads = generateDynamicGrid(size);
        this.cars = generateCars(params.getNumberOfCars());

        // Reset des stats
        this.totalJamsDetected = 0;
        this.sumOfAverageSpeeds = 0;
        this.iterationsExecuted = 0;

        this.minGlobalSpeed = Double.MAX_VALUE;
        this.maxGlobalSpeed = 0.0;
        this.totalAccidents = 0;

        this.roadCongestionCounter = new HashMap<>();
        for(Road r : roads) {
            roadCongestionCounter.put(r.getId(), 0);
        }

        System.out.println("✅ Simulation initialisée : " + cars.size() + " voitures sur une grille " + size + "x" + size);
    }

    /**
     * Exécute UNE itération complète (Mouvement + Collision + Stats)
     */
    public void updateIteration() {
        double totalSpeedInThisTick = 0;
        int carsStuckCount = 0;

        // 1. Mouvement & Collision (Pour chaque voiture)
        for (Car car : cars) {
            moveCar(car);

            // Collecte de données instantanée
            totalSpeedInThisTick += car.getSpeed();

            // Si la voiture roule, elle n'est pas bloquée
            if (car.getSpeed() < 5.0) {
                carsStuckCount++;
            }
        }

        // 2. Calcul des Statistiques Globales de ce tour
        double avgSpeedThisTick = cars.isEmpty() ? 0 : totalSpeedInThisTick / cars.size();

        // Mise à jour Min / Max (Monte Carlo)
        if (avgSpeedThisTick < minGlobalSpeed) minGlobalSpeed = avgSpeedThisTick;
        if (avgSpeedThisTick > maxGlobalSpeed) maxGlobalSpeed = avgSpeedThisTick;

        // Détection d'embouteillage global (si > 50% des voitures sont bloquées)
        boolean isJam = !cars.isEmpty() && ((double) carsStuckCount / cars.size()) > 0.5;

        // 3. Mise à jour des cumuls globaux
        sumOfAverageSpeeds += avgSpeedThisTick;
        if (isJam) {
            totalJamsDetected++;
        }
        iterationsExecuted++;
    }

    /**
     * Méthode pour récupérer le rapport final complet
     * CORRIGÉE pour matcher ton constructeur SimulationResult
     */
    public SimulationResult getFinalResult() {
        double globalAverageSpeed = iterationsExecuted == 0 ? 0 : sumOfAverageSpeeds / iterationsExecuted;

        // Transformation du compteur brut (Integer) en pourcentage de congestion (Double) pour la Map
        Map<String, Double> congestionResultMap = new HashMap<>();
        for (Map.Entry<String, Integer> entry : roadCongestionCounter.entrySet()) {
            // Ratio : (Nombre de fois bouché) / (Nombre total d'itérations)
            // Ex: 0.5 = bouché 50% du temps
            double congestionRatio = iterationsExecuted == 0 ? 0.0 : (double) entry.getValue() / iterationsExecuted;
            congestionResultMap.put(entry.getKey(), congestionRatio);
        }

        // Calcul probabilité accident
        double accidentProb = cars.isEmpty() ? 0 : (double) totalAccidents / cars.size() * 100.0;

        // Appel du constructeur EXACT de ta classe SimulationResult
        return new SimulationResult(
                totalJamsDetected,      // int totalJams
                globalAverageSpeed,     // double avgSpeed
                congestionResultMap,    // Map<String, Double> congestionMap
                minGlobalSpeed,         // double minSpeedObserved
                maxGlobalSpeed,         // double maxSpeedObserved
                accidentProb            // double accidentProbability
        );
    }

    // --- Logique de Mouvement ---
    private void moveCar(Car car) {
        // Si la voiture est accidentée, elle ne bouge plus
        if (car.isCrashed()) {
            car.setSpeed(0);
            return;
        }

        Road road = findRoadById(car.getCurrentRoadId());
        if (road == null) return;

        double desiredSpeed = calculateSpeed(car, road);

        // --- SIMULATION ACCIDENT ---
        double accidentChance = 0.0001;
        if (currentParams.getWeather() == Weather.RAINY) accidentChance *= 3;
        if (currentParams.getWeather() == Weather.FOGGY) accidentChance *= 5;
        if (car.getDriverType() == DriverType.AGGRESSIVE) accidentChance *= 2;

        if (randomEvent(accidentChance)) {
            car.setCrashed(true);
            car.setSpeed(0);
            totalAccidents++;
            return;
        }

        // --- COLLISION ---
        Car carInFront = findCarInFront(car);
        if (carInFront != null) {
            double distance = carInFront.getPosition() - car.getPosition();
            if (distance < 10.0) {
                double speedOfFrontCar = carInFront.getSpeed();
                desiredSpeed = Math.min(desiredSpeed, speedOfFrontCar);
                if (distance < 5.0) desiredSpeed = 0;
            }
        }

        // --- FLUCTUATION ---
        if (randomEvent(0.1)) {
            double fluctuation = 0.9 + (random.nextDouble() * 0.2);
            desiredSpeed *= fluctuation;
        }

        car.setSpeed(desiredSpeed);

        // --- CALCUL POSITION ---
        double distanceParcourue = (car.getSpeed() / 3.6);
        double newPosition = car.getPosition() + distanceParcourue;

        // Fin de route
        if (newPosition >= road.getLength()) {
            newPosition = road.getLength();
            car.setSpeed(0);
        }

        // Anti-overlap
        if (carInFront != null && newPosition > carInFront.getPosition() - 2.0) {
            newPosition = carInFront.getPosition() - 2.0;
            car.setSpeed(0);
        }

        // Mise à jour stats congestion par route
        if (car.getSpeed() < 5.0) {
            String rid = road.getId();
            roadCongestionCounter.put(rid, roadCongestionCounter.getOrDefault(rid, 0) + 1);
        }

        car.setPosition(newPosition);
    }

    // --- Utilitaires ---

    private double calculateSpeed(Car car, Road road) {
        double baseSpeed = road.getSpeedLimit();
        if (currentParams != null) {
            switch (currentParams.getWeather()) {
                case RAINY -> baseSpeed *= 0.8;
                case FOGGY -> baseSpeed *= 0.6;
                case NIGHT -> baseSpeed *= 0.9;
                case SUNNY -> {}
            }
        }
        switch (car.getDriverType()) {
            case AGGRESSIVE -> baseSpeed *= 1.1;
            case CAREFUL -> baseSpeed *= 0.8;
            case NORMAL -> {}
        }
        return baseSpeed;
    }

    private Car findCarInFront(Car currentCar) {
        double minDistance = Double.MAX_VALUE;
        Car closestCar = null;
        for (Car otherCar : cars) {
            if (otherCar != currentCar && otherCar.getCurrentRoadId().equals(currentCar.getCurrentRoadId())) {
                if (otherCar.getPosition() > currentCar.getPosition()) {
                    double distance = otherCar.getPosition() - currentCar.getPosition();
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCar = otherCar;
                    }
                }
            }
        }
        return closestCar;
    }

    private boolean randomEvent(double probability) {
        return random.nextDouble() < probability;
    }

    private Road findRoadById(String id) {
        return roads.stream().filter(r -> r.getId().equals(id)).findFirst().orElse(null);
    }

    // --- Création ---
    private List<Car> generateCars(int count) {
        List<Car> generatedCars = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Road randomRoad = roads.get(random.nextInt(roads.size()));
            DriverType randomDriver = DriverType.values()[random.nextInt(DriverType.values().length)];
            Car car = new Car(i, randomRoad.getId(), randomDriver);
            car.setPosition(random.nextDouble() * randomRoad.getLength());
            car.setSpeed(0);
            generatedCars.add(car);
        }
        return generatedCars;
    }

    private List<Road> generateDynamicGrid(int size) {
        List<Road> generatedRoads = new ArrayList<>();
        for (int x = 0; x < size; x++) {
            for (int y = 0; y < size; y++) {
                if (x < size - 1) {
                    generatedRoads.add(new Road("R_H_" + x + "_" + y, "I_" + x + "_" + y, "I_" + (x + 1) + "_" + y, 1000, 50));
                }
                if (y < size - 1) {
                    generatedRoads.add(new Road("R_V_" + x + "_" + y, "I_" + x + "_" + y, "I_" + x + "_" + (y + 1), 1000, 50));
                }
            }
        }
        return generatedRoads;
    }

    // Getters
    public List<Car> getCars() { return cars; }
    public List<Road> getRoads() { return roads; }
}