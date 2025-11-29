package com.grid.common.logic;

import com.grid.common.model.*;

public class TestSimulation {

    public static void main(String[] args) {
        System.out.println("🚗 --- DÉBUT DU TEST DE SIMULATION --- 🚗");

        // 1. Préparer les paramètres (Petit test)
        // 50 voitures, 100 itérations (secondes), Météo PLUIE, Seed 12345
        SimulationParams params = new SimulationParams(
                50,
                100,
                Weather.RAINY,
                true,
                12345L
        );

        // 2. Instancier le moteur
        TrafficSimulationEngine engine = new TrafficSimulationEngine();

        // 3. Initialiser
        System.out.println("1️⃣ Initialisation...");
        engine.initializeSimulation(params);

        // 4. Lancer la boucle de simulation (Le cœur du Monte Carlo)
        System.out.println("2️⃣ Lancement de " + params.getIterations() + " itérations...");

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < params.getIterations(); i++) {
            engine.updateIteration();

            // (Optionnel) Afficher un petit point tous les 10 tours pour montrer que ça vit
            if (i % 10 == 0) System.out.print(".");
        }
        System.out.println(); // Saut de ligne

        long endTime = System.currentTimeMillis();
        System.out.println("⏱️ Temps de calcul : " + (endTime - startTime) + " ms");

        // 5. Récupérer et afficher les résultats
        System.out.println("3️⃣ Résultats finaux :");
        SimulationResult result = engine.getFinalResult();

        System.out.println("---------------------------------------------");
        System.out.println("➡️ Nombre total d'embouteillages détectés : " + result.getTotalJamsDetected());
        System.out.println("➡️ Vitesse moyenne globale : " + String.format("%.2f", result.getAverageSpeed()) + " km/h");
        System.out.println("---------------------------------------------");

        // 6. Validation logique (Acceptance Criteria)
        if (result.getAverageSpeed() > 0 && result.getAverageSpeed() < 130) {
            System.out.println("✅ TEST RÉUSSI : Les résultats semblent cohérents.");
        } else {
            System.out.println("❌ TEST ÉCHOUÉ : Vitesse moyenne suspecte (" + result.getAverageSpeed() + ")");
        }
    }
}