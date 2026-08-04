import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
    Camera,
    BriefcaseBusiness,
    Megaphone,
    Layers3,
    TrendingUp,
    CalendarDays,
    CircleCheckBig,
} from "lucide-react";

import { STATUS } from "../constants/status";

function PlatformOverview() {
    const platforms = useSelector((state) => state.platforms.platforms);
    const posts = useSelector((state) => state.posts.posts);

    const icons = {
        Instagram: Camera,
        LinkedIn: BriefcaseBusiness,
        "Twitter (X)": Megaphone,
    };

    const platformData = useMemo(() => {
        return platforms.map((platform) => {
            const platformPosts = posts.filter(
                (post) => post.platform === platform.name,
            );

            const drafts = platformPosts.filter(
                (post) => post.status === STATUS.DRAFT,
            ).length;

            const scheduled = platformPosts.filter(
                (post) => post.status === STATUS.SCHEDULED,
            ).length;

            const published = platformPosts.filter(
                (post) => post.status === STATUS.PUBLISHED,
            ).length;

            const completion =
                platformPosts.length > 0
                    ? Math.round((published / platformPosts.length) * 100)
                    : 0;

            return {
                ...platform,
                total: platformPosts.length,
                drafts,
                scheduled,
                published,
                completion,
            };
        });
    }, [platforms, posts]);

    return (
        <section className="platform-overview-card">
            <div className="platform-overview-header">
                <div className="platform-overview-title">
                    <div className="platform-overview-icon">
                        <Layers3 size={22} />
                    </div>

                    <div>
                        <h2>Platform Overview</h2>

                        <p>
                            Monitor publishing performance across every
                            connected platform.
                        </p>
                    </div>
                </div>
            </div>

            <div className="platform-grid">
                {platformData.map((platform) => {
                    const Icon = icons[platform.name] || Layers3;

                    return (
                        <article key={platform.id} className="platform-panel">
                            <div className="platform-panel-top">
                                <div className="platform-brand">
                                    <div className="brand-icon">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h3>{platform.name}</h3>

                                        <span>
                                            {platform.total} Total Posts
                                        </span>
                                    </div>
                                </div>

                                <div className="completion-chip">
                                    {platform.completion}%
                                </div>
                            </div>

                            <div className="platform-progress">
                                <div
                                    className="platform-progress-fill"
                                    style={{
                                        width: `${platform.completion}%`,
                                    }}
                                />
                            </div>

                            <div className="platform-stats">
                                <div>
                                    <CircleCheckBig size={16} />

                                    <span>Published</span>

                                    <strong>{platform.published}</strong>
                                </div>

                                <div>
                                    <CalendarDays size={16} />

                                    <span>Scheduled</span>

                                    <strong>{platform.scheduled}</strong>
                                </div>

                                <div>
                                    <TrendingUp size={16} />

                                    <span>Drafts</span>

                                    <strong>{platform.drafts}</strong>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default PlatformOverview;
