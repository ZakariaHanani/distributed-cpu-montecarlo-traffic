import type { SimulationJobSummary } from "../types/job";

const mockJobs: SimulationJobSummary[] = [
  {
    id: "job-123",
    createdAt: "2025-12-01T10:12:00Z",
    status: "RUNNING",
    totalIterations: 100000,
    completedIterations: 42000,
  },
  {
    id: "job-122",
    createdAt: "2025-11-30T21:03:00Z",
    status: "COMPLETED",
    totalIterations: 50000,
    completedIterations: 50000,
  },
];

export const DashboardPage: React.FC = () => {
  const totalJobs = mockJobs.length;
  const runningJobs = mockJobs.filter((j) => j.status === "RUNNING").length;
  const completedJobs = mockJobs.filter((j) => j.status === "COMPLETED").length;

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Overview of Monte Carlo traffic simulations running on the grid.
      </p>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Total Jobs</div>
          <div className="card-metric">{totalJobs}</div>
        </div>
        <div className="card">
          <div className="card-title">Running</div>
          <div className="card-metric">{runningJobs}</div>
        </div>
        <div className="card">
          <div className="card-title">Completed</div>
          <div className="card-metric">{completedJobs}</div>
        </div>
      </div>
    </div>
  );
};
