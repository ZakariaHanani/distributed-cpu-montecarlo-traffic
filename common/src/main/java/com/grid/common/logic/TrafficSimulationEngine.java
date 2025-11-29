package com.grid.common.logic;

import com.grid.common.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class TrafficSimulationEngine {

    private List<Road> roads;
    private List<Car> cars;
    private Random random;

    // 👇 1. AJOUT IMPORTANT : On doit garder les paramètres en mémoire pour connaître la météo plus tard
    private SimulationParams currentParams;

    /**
     * Initialise la simulation en créant la ville et les voitures.
     * Correspond à l'Issue 7.2
     */
    public void initializeSimulation(SimulationParams params) {
        // 👇 2. AJOUT : On sauvegarde les params
        this.currentParams = params;

        this.random = new Random(params.getSeed());
        this.roads = createSimpleGrid();
        this.cars = generateCars(params.getNumberOfCars());

        System.out.println("✅ Simulation initialisée : " + cars.size() + " voitures sur " + roads.size() + " routes.");
    }

    /**
     * 🟢 ISSUE 7.3 : Fait avancer la simulation d'un pas (1 seconde)
     */
    public void runOneStep() {
        // Pour chaque voiture, on calcule son nouveau déplacement
        for (Car car : cars) {
            moveCar(car);
        }
    }

    // --- 👇 NOUVELLES MÉTHODES POUR L'ISSUE 7.3 (Copie tout ça) ---

    private void moveCar(Car car) {
        // A. Trouver la route actuelle
        Road road = findRoadById(car.getCurrentRoadId());
        if (road == null) return; // Sécurité si la route n'existe pas

        // B. Calculer la vitesse théorique selon météo/conducteur
        double maxSpeed = calculateSpeed(car, road);
        car.setSpeed(maxSpeed);

        // C. Calculer la distance parcourue en 1 seconde (km/h divisé par 3.6 = m/s)
        double distanceParcourue = (car.getSpeed() / 3.6);
        double newPosition = car.getPosition() + distanceParcourue;

        // D. Vérifier si on dépasse la fin de la route
        if (newPosition >= road.getLength()) {
            // STOP ! On est au bout.
            // Pour l'instant on s'arrête (Collision detection viendra en 7.4)
            newPosition = road.getLength();
            car.setSpeed(0);
        }

        // E. Mettre à jour la position
        car.setPosition(newPosition);
    }

    private double calculateSpeed(Car car, Road road) {
        double baseSpeed = road.getSpeedLimit();

        // Règle 1 : Impact de la Météo
        if (currentParams != null) {
            switch (currentParams.getWeather()) {
                case RAINY -> baseSpeed *= 0.8; // -20%
                case FOGGY -> baseSpeed *= 0.6; // -40%
                case NIGHT -> baseSpeed *= 0.9; // -10%
                case SUNNY -> {} // Rien ne change
            }
        }

        // Règle 2 : Impact du Conducteur
        switch (car.getDriverType()) {
            case AGGRESSIVE -> baseSpeed *= 1.1; // +10%
            case CAREFUL -> baseSpeed *= 0.8;    // -20%
            case NORMAL -> {}
        }

        return baseSpeed;
    }

    private Road findRoadById(String id) {
        return roads.stream()
                .filter(r -> r.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // --- FIN DES NOUVELLES MÉTHODES ---

    // --- Logique de Création (Issue 7.2 - Inchangé) ---
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

    public List<Car> getCars() { return cars; }
    public List<Road> getRoads() { return roads; }
}