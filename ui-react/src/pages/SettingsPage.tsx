import { useState } from "react";

export const SettingsPage: React.FC = () => {
  const [registryHost, setRegistryHost] = useState("127.0.0.1");
  const [registryPort, setRegistryPort] = useState(1099);
  const [defaultIterations, setDefaultIterations] = useState(100000);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to backend or store in local storage
    console.log({ registryHost, registryPort, defaultIterations });
  };

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">
        UI and master connection settings (placeholder for now).
      </p>

      <div className="card">
        <form onSubmit={handleSave} className="form-grid">
          <div>
            <label>Registry host</label>
            <input
              type="text"
              value={registryHost}
              onChange={(e) => setRegistryHost(e.target.value)}
            />
          </div>

          <div>
            <label>Registry port</label>
            <input
              type="number"
              value={registryPort}
              onChange={(e) => setRegistryPort(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Default iterations per job</label>
            <input
              type="number"
              value={defaultIterations}
              onChange={(e) => setDefaultIterations(Number(e.target.value))}
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};
