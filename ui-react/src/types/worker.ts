export type WorkerStatus = "ONLINE" | "OFFLINE" | "BUSY";

export interface WorkerSummary {
  id: string;
  host: string;
  lastHeartbeat: string;
  status: WorkerStatus;
  currentJobId?: string;
}
