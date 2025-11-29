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

    /**
     * Initialise la simulation en créant la ville et les voitures.
     * Correspond à l'Issue 7.2
     */
    public void initializeSimulation(SimulationParams params) {
        // 1. Initialisation du Random avec la SEED (Critère important du ticket #46)
        // Cela permet de rejouer exactement la même simulation si besoin.
        this.random = new Random(params.getSeed());

        // 2. Création de la ville (Grille simple pour l'instant)
        this.roads = createSimpleGrid();

        // 3. Création des voitures (Task 7.2)
        this.cars = generateCars(params.getNumberOfCars());

        System.out.println("✅ Simulation initialisée : " + cars.size() + " voitures sur " + roads.size() + " routes.");
    }

    // --- Logique de Création des Voitures (Issue 7.2) ---
    private List<Car> generateCars(int count) {
        List<Car> generatedCars = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            // A. Choisir une route au hasard
            Road randomRoad = roads.get(random.nextInt(roads.size()));

            // B. Choisir un type de conducteur au hasard
            DriverType randomDriver = DriverType.values()[random.nextInt(DriverType.values().length)];

            // C. Créer l'objet Voiture
            Car car = new Car(i, randomRoad.getId(), randomDriver);

            // D. Position aléatoire sur la route (entre 0 et la longueur de la route)
            car.setPosition(random.nextDouble() * randomRoad.getLength());

            // E. Vitesse initiale (par sécurité, on commence à 0 ou à une vitesse modérée)
            car.setSpeed(0);

            generatedCars.add(car);
        }
        return generatedCars;
    }

    // --- Création de la Carte (Mock simple pour l'instant) ---
    private List<Road> createSimpleGrid() {
        List<Road> cityRoads = new ArrayList<>();
        // On crée juste quelques routes pour tester que les voitures se placent bien
        // (ID, From, To, Length, SpeedLimit)
        cityRoads.add(new Road("R01", "I00", "I01", 500, 50)); // Route de 500m
        cityRoads.add(new Road("R02", "I01", "I02", 500, 50));
        cityRoads.add(new Road("R03", "I02", "I03", 500, 50));
        cityRoads.add(new Road("R04", "I00", "I10", 300, 30)); // Petite rue
        return cityRoads;
    }

    // Getters pour que le Worker puisse récupérer l'état
    public List<Car> getCars() { return cars; }
    public List<Road> getRoads() { return roads; }
}