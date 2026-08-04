import { useNavigate } from "react-router-dom";

export default function Dashboard() {
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
          <h1>User Dashboard</h1>
          <p>Welcome to your dashboard</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="dashboard-cards">

        <div className="card">
          <h2>Profile</h2>
          <p>View and update your profile information.</p>
        </div>

        <div className="card">
          <h2>My Activity</h2>
          <p>Track your recent activity and login history.</p>
        </div>

        <div className="card">
          <h2>Notifications</h2>
          <p>Check your latest notifications.</p>
        </div>

      </div>

      <div className="user-panel">
        <h2>User Actions</h2>

        <button className="admin-btn">
          Edit Profile
        </button>

        <button className="admin-btn">
          View History
        </button>

        <button className="admin-btn">
          Contact Support
        </button>
      </div>
    </div>
  );
}