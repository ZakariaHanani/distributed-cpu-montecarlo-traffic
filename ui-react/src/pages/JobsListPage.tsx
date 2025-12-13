import { Link } from "react-router-dom";

const mockJobs = [
  {
    id: "job-123",
    status: "RUNNING",
    totalIterations: 100000,
    completedIterations: 42000,
  },
  {
    id: "job-122",
    status: "COMPLETED",
    totalIterations: 50000,
    completedIterations: 50000,
  },
];

export const JobsListPage: React.FC = () => {
  return (
    <div>
      <h1 className="page-title">Simulation Jobs</h1>
      <p className="page-subtitle">
        List of submitted Monte Carlo simulations and their status.
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
              <th align="left">Job ID</th>
              <th align="left">Status</th>
              <th align="left">Progress</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockJobs.map((job) => {
              const progress =
                job.totalIterations === 0
                  ? 0
                  : Math.round(
                      (job.completedIterations / job.totalIterations) * 100
                    );

              return (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.status}</td>
                  <td>{progress}%</td>
                  <td>
                    <Link to={`/jobs/${job.id}`}>Details</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
