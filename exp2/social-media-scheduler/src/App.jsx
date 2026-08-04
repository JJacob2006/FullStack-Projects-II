import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import SearchToolbar from "./components/SearchToolbar";
import PlatformOverview from "./components/PlatformOverview";
import CreatePost from "./components/CreatePost";
import MonthlyCalendar from "./components/MonthlyCalendar";
import DraftPreview from "./components/DraftPreview";
import UpcomingPosts from "./components/UpcomingPosts";
import PublishedPosts from "./components/PublishedPosts";

function App() {
    return (
        <main className="dashboard">
            <Header />

            <div className="dashboard-body">
                <section
                    className="dashboard-section"
                    aria-label="Analytics Overview"
                >
                    <StatsCards />
                </section>

                <section
                    className="dashboard-section"
                    aria-label="Search and Filters"
                >
                    <SearchToolbar />
                </section>

                <section
                    className="workspace-grid"
                    aria-label="Content Workspace"
                >
                    <div className="workspace-main">
                        <CreatePost />
                    </div>

                    <aside className="workspace-sidebar">
                        <PlatformOverview />
                        <MonthlyCalendar />
                    </aside>
                </section>

                <section
                    className="dashboard-section"
                    aria-label="Publishing Overview"
                >
                    <div className="posts-grid">
                        <DraftPreview />
                        <UpcomingPosts />
                        <PublishedPosts />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default App;
