package com.grid.common.logic;

import com.grid.common.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

@Service
public class TrafficSimulationEngine {

    private List<Road> roads;
    private List<Car> cars;
    private Random random;
    private SimulationParams currentParams;

    // --- Statistiques cumulées pour le résultat final ---
    private int totalJamsDetected;
    private double sumOfAverageSpeeds;
    private int iterationsExecuted;

    /**
     * Initialise la simulation en créant la ville et les voitures.
     * Reset des compteurs statistiques.
     */
    public void initializeSimulation(SimulationParams params) {
        this.currentParams = params;
        this.random = new Random(params.getSeed());
        this.roads = createSimpleGrid();
        this.cars = generateCars(params.getNumberOfCars());

        // Reset des stats
        this.totalJamsDetected = 0;
        this.sumOfAverageSpeeds = 0;
        this.iterationsExecuted = 0;

        System.out.println("✅ Simulation initialisée : " + cars.size() + " voitures.");
    }

    /**
     * 🟢 ISSUE 7.6 : Exécute UNE itération complète (Mouvement + Collision + Stats)
     */
    public void updateIteration() {
        double totalSpeedInThisTick = 0;
        int carsStuckCount = 0;

        // 1. Mouvement & Collision (Pour chaque voiture)
        for (Car car : cars) {
            moveCar(car);

            // Collecte de données instantanée
            totalSpeedInThisTick += car.getSpeed();
            if (car.getSpeed() < 5.0) { // Si vitesse < 5 km/h, on considère qu'elle est bloquée
                carsStuckCount++;
            }
        }

        // 2. Calcul des Statistiques Globales de ce tour
        double avgSpeedThisTick = cars.isEmpty() ? 0 : totalSpeedInThisTick / cars.size();

        // Détection d'embouteillage global (si > 50% des voitures sont bloquées)
        boolean isJam = !cars.isEmpty() && ((double) carsStuckCount / cars.size()) > 0.5;

        // 3. Mise à jour des cumuls
        sumOfAverageSpeeds += avgSpeedThisTick;
        if (isJam) {
            totalJamsDetected++;
        }
        iterationsExecuted++;
    }

    /**
     * Méthode pour récupérer le rapport final (Sera utilisée par le Worker à la fin)
     */
    public SimulationResult getFinalResult() {
        double globalAverageSpeed = iterationsExecuted == 0 ? 0 : sumOfAverageSpeeds / iterationsExecuted;

        // Note: La congestionMap sera implémentée plus finement plus tard,
        // ici on met une map vide ou basique pour l'instant.
        return new SimulationResult(totalJamsDetected, globalAverageSpeed, new HashMap<>());
    }

    // --- Logique de Mouvement (Issue 7.3 & 7.4) ---
    private void moveCar(Car car) {
        Road road = findRoadById(car.getCurrentRoadId());
        if (road == null) return;

        double desiredSpeed = calculateSpeed(car, road);

        // Collision logic (Issue 7.4)
        Car carInFront = findCarInFront(car);
        if (carInFront != null) {
            double distance = carInFront.getPosition() - car.getPosition();
            if (distance < 10.0) {
                double speedOfFrontCar = carInFront.getSpeed();
                desiredSpeed = Math.min(desiredSpeed, speedOfFrontCar);
                if (distance < 5.0) desiredSpeed = 0;
            }
        }

        // Random fluctuation (Issue 7.5)
        if (randomEvent(0.1)) { // 10% de chance de variation
            double fluctuation = 0.9 + (random.nextDouble() * 0.2); // 0.9 à 1.1
            desiredSpeed *= fluctuation;
        }

        car.setSpeed(desiredSpeed);

        double distanceParcourue = (car.getSpeed() / 3.6);
        double newPosition = car.getPosition() + distanceParcourue;

        if (newPosition >= road.getLength()) {
            newPosition = road.getLength();
            car.setSpeed(0);
        }

        // Anti-overlap correction
        if (carInFront != null && newPosition > carInFront.getPosition() - 2.0) {
            newPosition = carInFront.getPosition() - 2.0;
            car.setSpeed(0);
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
            if (otherCar.getCurrentRoadId().equals(currentCar.getCurrentRoadId())) {
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

    // --- Création (Issue 7.2) ---
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

    private List<Road> createSimpleGrid() {
        List<Road> cityRoads = new ArrayList<>();
        cityRoads.add(new Road("R01", "I00", "I01", 500, 50));
        cityRoads.add(new Road("R02", "I01", "I02", 500, 50));
        cityRoads.add(new Road("R03", "I02", "I03", 500, 50));
        cityRoads.add(new Road("R04", "I00", "I10", 300, 30));
        return cityRoads;
    }
}