const mockWorkers = [
  {
    id: "worker-1",
    host: "192.168.1.10",
    status: "ONLINE",
    lastHeartbeat: "2s ago",
  },
  {
    id: "worker-2",
    host: "192.168.1.11",
    status: "BUSY",
    lastHeartbeat: "5s ago",
  },
  {
    id: "worker-3",
    host: "192.168.1.12",
    status: "OFFLINE",
    lastHeartbeat: "3m ago",
  },
];

export const WorkersPage: React.FC = () => {
  return (
    <div>
      <h1 className="page-title">Workers</h1>
      <p className="page-subtitle">
        Nodes that execute simulation chunks for the master.
      </p>

      <div className="card">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr>
              <th align="left">Worker ID</th>
              <th align="left">Host</th>
              <th align="left">Status</th>
              <th align="left">Last heartbeat</th>
            </tr>
          </thead>
          <tbody>
            {mockWorkers.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.host}</td>
                <td>{w.status}</td>
                <td>{w.lastHeartbeat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
