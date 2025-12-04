export type JobStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export interface SimulationJobSummary {
  id: string;
  createdAt: string;
  status: JobStatus;
  totalIterations: number;
  completedIterations: number;
}
