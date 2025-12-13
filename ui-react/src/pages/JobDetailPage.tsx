import { useParams } from "react-router-dom";

export const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();

  // later: fetch job result from backend using jobId
  return (
    <div>
      <h1 className="page-title">Job Details</h1>
      <p className="page-subtitle">
        Aggregated result for job <strong>{jobId}</strong>.
      </p>

      <div className="card">
        <p>This is where we will show:</p>
        <ul>
          <li>Global jam probability</li>
          <li>Average speed over all chunks</li>
          <li>Heatmap / congestion per road</li>
        </ul>
      </div>
    </div>
  );
};
