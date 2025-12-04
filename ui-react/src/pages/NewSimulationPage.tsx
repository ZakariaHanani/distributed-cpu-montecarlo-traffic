import { useState } from "react";
import { Weather } from "../types/simulation";

//Just a form skeleton (later it will call backend)

export const NewSimulationPage: React.FC = () => {
  const [cars, setCars] = useState(200);
  const [iterations, setIterations] = useState(100000);
  const [weather, setWeather] = useState<Weather>(Weather.SUNNY);
  const [trafficLights, setTrafficLights] = useState(true);
  const [seed, setSeed] = useState(12345);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call backend API later
    console.log({
      cars,
      iterations,
      weather,
      trafficLights,
      seed,
    });
  };

  return (
    <div>
      <h1 className="page-title">New Simulation</h1>
      <p className="page-subtitle">
        Configure Monte Carlo parameters and submit to the master node.
      </p>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-grid">
          {/* You can style .form-grid in App.css later */}

          <div>
            <label>Number of cars</label>
            <input
              type="number"
              value={cars}
              onChange={(e) => setCars(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Total iterations</label>
            <input
              type="number"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Weather</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value as Weather)}
            >
              <option value={Weather.SUNNY}>Sunny</option>
              <option value={Weather.RAINY}>Rainy</option>
              <option value={Weather.FOGGY}>Foggy</option>
              <option value={Weather.NIGHT}>Night</option>
            </select>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={trafficLights}
                onChange={(e) => setTrafficLights(e.target.checked)}
              />
              Enable traffic lights
            </label>
          </div>

          <div>
            <label>Random seed</label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
            />
          </div>

          <button type="submit">Submit simulation</button>
        </form>
      </div>
    </div>
  );
};
