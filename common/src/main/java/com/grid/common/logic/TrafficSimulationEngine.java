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
        if (road == null) return;

        // B. Calculer la vitesse théorique (Météo/Conducteur)
        double desiredSpeed = calculateSpeed(car, road);

        // --- 🟢 DEBUT CODE ISSUE 7.4 (COLLISION) ---

        // 1. Regarder s'il y a quelqu'un devant
        Car carInFront = findCarInFront(car);

        if (carInFront != null) {
            double distanceToNextCar = carInFront.getPosition() - car.getPosition();
            double safetyDistance = 10.0; // On veut garder 10 mètres de sécurité

            // 2. Si on est trop près, on freine !
            if (distanceToNextCar < safetyDistance) {
                // On adapte notre vitesse pour ne pas la percuter
                // On prend la vitesse de l'autre voiture, ou 0 si on est collé
                double speedOfFrontCar = carInFront.getSpeed();
                desiredSpeed = Math.min(desiredSpeed, speedOfFrontCar);

                // Si on est vraiment collé (< 5m), arrêt total
                if (distanceToNextCar < 5.0) {
                    desiredSpeed = 0;
                }
            }
        }


        // C. Appliquer la vitesse calculée (freinage inclus)
        car.setSpeed(desiredSpeed);

        // D. Calculer la nouvelle position
        double distanceParcourue = (car.getSpeed() / 3.6);
        double newPosition = car.getPosition() + distanceParcourue;

        // E. Vérifier si on dépasse la fin de la route
        if (newPosition >= road.getLength()) {
            newPosition = road.getLength();
            car.setSpeed(0);
        }

        // F. Correction physique (Anti-Overlap) : Ne jamais dépasser la voiture de devant
        if (carInFront != null && newPosition > carInFront.getPosition() - 2.0) {
            newPosition = carInFront.getPosition() - 2.0; // On reste 2m derrière
            car.setSpeed(0);
        }

        // G. Mise à jour finale
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
        double fluctuation = 0.95 + (random.nextDouble() * 0.10); // entre 0.95 et 1.05
        baseSpeed *= fluctuation;

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

    /**
     * Trouve la voiture la plus proche devant nous sur la même route.
     * @param currentCar La voiture qui cherche
     * @return La voiture de devant (ou null s'il n'y a personne)
     */
    private Car findCarInFront(Car currentCar) {
        double minDistance = Double.MAX_VALUE;
        Car closestCar = null;

        for (Car otherCar : cars) {
            // On cherche seulement sur la MEME route
            if (otherCar.getCurrentRoadId().equals(currentCar.getCurrentRoadId())) {
                // Et seulement si elle est DEVANT (position plus grande)
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

    /**
     * Méthode utilitaire pour générer un événement aléatoire.
     * @param probability Probabilité entre 0.0 et 1.0 (ex: 0.1 pour 10%)
     * @return true si l'événement se produit
     */
    private boolean randomEvent(double probability) {
        return random.nextDouble() < probability;
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