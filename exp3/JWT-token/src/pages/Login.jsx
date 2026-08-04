import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../App.css";

export default function Login() {
    const navigate = useNavigate();
    const [activeMode, setActiveMode] = useState("user");

    const login = (email, password) => {
        if (activeMode === "admin") {
            if (email === "admin@gmail.com" && password === "admin123") {
                localStorage.setItem("token", "admin-jwt-token");
                localStorage.setItem("role", "admin");
                navigate("/admin");
                return;
            }
        } else {
            if (email === "user@gmail.com" && password === "user123") {
                localStorage.setItem("token", "user-jwt-token");
                localStorage.setItem("role", "user");
                navigate("/dashboard");
                return;
            }
        }

        alert("Invalid Email or Password");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>JWT Authentication</h1>
                <p>Choose a mode and sign in to continue.</p>
                <LoginForm onLogin={login} activeMode={activeMode} onModeChange={setActiveMode} />
            </div>
        </div>
    );
}