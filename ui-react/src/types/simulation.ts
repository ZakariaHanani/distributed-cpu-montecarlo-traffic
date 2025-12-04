/** later you can sync this with your Java SimulationParams */
export interface SimulationParamsDto {
  numberOfCars: number;
  iterations: number;
  weather: Weather;
  trafficLightsEnabled: boolean;
  seed: number;
}

export enum Weather {
  SUNNY = "SUNNY",
  RAINY = "RAINY",
  FOGGY = "FOGGY",
  NIGHT = "NIGHT",
}
