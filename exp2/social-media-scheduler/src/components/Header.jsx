import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    CalendarDays,
    Activity,
    Clock3,
    MoonStar,
    Sun,
    Sparkles,
} from "lucide-react";

import { STATUS } from "../constants/status";

function getSystemTheme() {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function getInitialTheme() {
    if (typeof window === "undefined") return "light";

    const savedTheme = window.localStorage.getItem("scheduler-theme");

    return savedTheme || getSystemTheme();
}

function Header() {
    const posts = useSelector((state) => state.posts.posts);

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("scheduler-theme", theme);
    }, [theme]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (!localStorage.getItem("scheduler-theme")) {
                setTheme(getSystemTheme());
            }
        };

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, []);

    const drafts = posts.filter((post) => post.status === STATUS.DRAFT).length;

    const scheduled = posts.filter(
        (post) => post.status === STATUS.SCHEDULED,
    ).length;

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const isDark = theme === "dark";

    return (
        <header className="dashboard-header">
            <div className="header-main">
                <div className="header-brand">
                    <div className="header-logo">
                        <Sparkles size={22} />
                    </div>

                    <div>
                        <h1>Social Media Scheduler</h1>

                        <p>Plan · Draft · Schedule · Publish</p>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="header-chip">
                        <Activity size={16} />

                        <div>
                            <span>Drafts</span>
                            <strong>{drafts}</strong>
                        </div>
                    </div>

                    <div className="header-chip">
                        <Clock3 size={16} />

                        <div>
                            <span>Scheduled</span>
                            <strong>{scheduled}</strong>
                        </div>
                    </div>

                    <button
                        className="theme-toggle"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                    >
                        {isDark ? <Sun size={18} /> : <MoonStar size={18} />}

                        <span>{isDark ? "Light" : "Dark"}</span>
                    </button>
                </div>
            </div>

            <div className="header-footer">
                <div className="header-date">
                    <CalendarDays size={16} />
                    <span>{today}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
