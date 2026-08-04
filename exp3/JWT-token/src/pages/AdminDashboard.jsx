import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, Administrator</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="dashboard-cards">

        <div className="card">
          <h2>Total Users</h2>
          <h3>120</h3>
          <p>Registered users in the system.</p>
        </div>

        <div className="card">
          <h2>Active Sessions</h2>
          <h3>34</h3>
          <p>Currently logged-in users.</p>
        </div>

        <div className="card">
          <h2>Pending Reports</h2>
          <h3>8</h3>
          <p>Reports waiting for review.</p>
        </div>

        <div className="card">
          <h2>System Status</h2>
          <h3>Online</h3>
          <p>Authentication server is running.</p>
        </div>

      </div>

      <div className="admin-panel">

        <h2>Admin Controls</h2>

        <button className="admin-btn">
          Manage Users
        </button>

        <button className="admin-btn">
          View Reports
        </button>

        <button className="admin-btn">
          System Settings
        </button>

      </div>

    </div>
  );
}