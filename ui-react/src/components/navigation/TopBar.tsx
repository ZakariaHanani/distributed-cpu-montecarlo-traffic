export const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-title">Distributed Traffic Simulation</div>
      <div className="topbar-right">
        <span className="topbar-badge">Master Node</span>
        {/* later: environment switch, user name, etc. */}
      </div>
    </header>
  );
};
