import { NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        CPU Grid
        <span className="sidebar-logo-sub">Traffic Monte Carlo</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/simulations/new" className="sidebar-link">
          New Simulation
        </NavLink>
        <NavLink to="/jobs" className="sidebar-link">
          Jobs
        </NavLink>
        <NavLink to="/workers" className="sidebar-link">
          Workers
        </NavLink>
        <NavLink to="/settings" className="sidebar-link">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};
