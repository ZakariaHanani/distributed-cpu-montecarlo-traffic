import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { NewSimulationPage } from "./pages/NewSimulationPage";
import { JobsListPage } from "./pages/JobsListPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { WorkersPage } from "./pages/WorkersPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="simulations/new" element={<NewSimulationPage />} />
        <Route path="jobs" element={<JobsListPage />} />
        <Route path="jobs/:jobId" element={<JobDetailPage />} />
        <Route path="workers" element={<WorkersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
