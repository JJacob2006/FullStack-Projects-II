import { useEffect, useState } from "react";

const demoCredentials = {
  admin: { email: "admin@gmail.com", password: "admin123" },
  user: { email: "user@gmail.com", password: "user123" },
};

export default function LoginForm({ onLogin, activeMode, onModeChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const selected = demoCredentials[activeMode];
    setEmail(selected.email);
    setPassword(selected.password);
  }, [activeMode]);

  return (
    <div className="login-form">
      <div className="mode-switch" role="tablist" aria-label="Login mode">
        <button
          type="button"
          className={`mode-btn ${activeMode === "user" ? "active" : ""}`}
          onClick={() => onModeChange("user")}
        >
          User Mode
        </button>
        <button
          type="button"
          className={`mode-btn ${activeMode === "admin" ? "active" : ""}`}
          onClick={() => onModeChange("admin")}
        >
          Admin Mode
        </button>
      </div>

      <input
        className="input-box"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input-box"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={() => onLogin(email, password)}>
        Sign in as {activeMode === "admin" ? "Admin" : "User"}
      </button>
    </div>
  );
}