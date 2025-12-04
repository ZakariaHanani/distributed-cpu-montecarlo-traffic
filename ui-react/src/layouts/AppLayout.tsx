import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation/Sidebar";
import { TopBar } from "../components/navigation/TopBar";
import "../App.css";

export const AppLayout: React.FC = () => {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <TopBar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
