package com.grid.common.logic;

import com.grid.common.model.*;
import java.util.Map;

public class TestSimulation {

    public static void main(String[] args) {
        System.out.println("🚗 --- DÉBUT DU TEST DE SIMULATION (MONTE CARLO) --- 🚗");

        // 1. Préparer les paramètres (Scénario de test)
        // 300 voitures, 120 itérations, Brouillard (FOGGY), Seed 20000L, Grille 6x6
        SimulationParams params = new SimulationParams(
                3000,
                120,
                Weather.FOGGY,
                true,
                20000L,
                6
        );

        // 2. Instancier le moteur
        TrafficSimulationEngine engine = new TrafficSimulationEngine();

        // 3. Initialiser
        System.out.println("1️⃣ Initialisation...");
        engine.initializeSimulation(params);

        // 4. Lancer la boucle de simulation
        System.out.println("2️⃣ Lancement de " + params.getIterations() + " itérations...");

        long startTime = System.currentTimeMillis();

        for (int i = 0; i < params.getIterations(); i++) {
            engine.updateIteration();

            // Afficher un point tous les 10 tours pour patienter
            if (i % 10 == 0) System.out.print(".");
        }
        System.out.println(); // Saut de ligne

        long endTime = System.currentTimeMillis();
        System.out.println("⏱️ Temps de calcul : " + (endTime - startTime) + " ms");

        // 5. Récupérer les résultats
        System.out.println("3️⃣ Résultats finaux :");
        SimulationResult result = engine.getFinalResult();

        // --- AFFICHAGE DU RAPPORT MONTE CARLO ---
        System.out.println("---------------------------------------------");
        System.out.println("📊 STATISTIQUES GLOBALES :");
        System.out.println("➡️ Nombre d'embouteillages détectés : " + result.getTotalJamsDetected());
        System.out.println("➡️ Vitesse moyenne globale          : " + String.format("%.2f", result.getAverageSpeed()) + " km/h");

        System.out.println("\n🎲 ANALYSE DES RISQUES (MONTE CARLO) :");
        System.out.println("   🔹 Pire vitesse observée (Min)   : " + String.format("%.2f", result.getMinSpeedObserved()) + " km/h");
        System.out.println("   🔹 Meilleure vitesse (Max)       : " + String.format("%.2f", result.getMaxSpeedObserved()) + " km/h");
        System.out.println("   ⚠️ Probabilité d'accident        : " + String.format("%.4f", result.getAccidentProbability()) + " %");

        // --- Analyse de la Heatmap pour trouver la pire route ---
        String worstRoad = "Aucune";
        double maxCongestion = -1.0;

        // On parcourt la map pour trouver la valeur la plus haute
        for (Map.Entry<String, Double> entry : result.getCongestionMap().entrySet()) {
            if (entry.getValue() > maxCongestion) {
                maxCongestion = entry.getValue();
                worstRoad = entry.getKey();
            }
        }

        System.out.println("\n📍 ZONE CRITIQUE :");
        System.out.println("   🔥 Route la plus bouchée         : " + worstRoad);
        System.out.println("   📈 Taux de congestion            : " + String.format("%.1f", maxCongestion * 100) + " % du temps");
        System.out.println("---------------------------------------------");

        // 6. Validation logique
        if (result.getAverageSpeed() > 0 && result.getAverageSpeed() < 130) {
            System.out.println("✅ TEST RÉUSSI : Simulation cohérente.");
        } else {
            System.out.println("❌ TEST ÉCHOUÉ : Vitesse moyenne suspecte (" + result.getAverageSpeed() + ")");
        }
    }
}