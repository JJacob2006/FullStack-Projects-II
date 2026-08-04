import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
    Files,
    FilePenLine,
    CalendarClock,
    CircleCheckBig,
    TrendingUp,
    CalendarDays,
    Clock3,
    Globe2,
    BarChart3,
    ArrowRightCircle,
} from "lucide-react";

import { STATUS } from "../constants/status";

function safeDate(value) {
    if (!value) return null;

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
}

function StatsCards() {
    const posts = useSelector((state) => state.posts.posts);

    const analytics = useMemo(() => {
        const validPosts = posts
            .map((post) => ({
                ...post,
                scheduleDateObject: safeDate(post.scheduleDate),
            }))
            .filter(
                (post) =>
                    post.status === STATUS.DRAFT || post.scheduleDateObject,
            );

        const draftPosts = validPosts.filter(
            (post) => post.status === STATUS.DRAFT,
        );

        const scheduledPosts = validPosts.filter(
            (post) => post.status === STATUS.SCHEDULED,
        );

        const publishedPosts = validPosts.filter(
            (post) => post.status === STATUS.PUBLISHED,
        );

        const now = new Date();

        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7);

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const postsThisWeek = scheduledPosts.filter(
            (post) =>
                post.scheduleDateObject >= startOfWeek &&
                post.scheduleDateObject < endOfWeek,
        ).length;

        const postsThisMonth = scheduledPosts.filter(
            (post) =>
                post.scheduleDateObject >= startOfMonth &&
                post.scheduleDateObject < endOfMonth,
        ).length;

        const upcomingPosts = scheduledPosts.filter(
            (post) => post.scheduleDateObject >= now,
        );

        const nextScheduledPost =
            upcomingPosts.length > 0
                ? [...upcomingPosts].sort(
                      (a, b) => a.scheduleDateObject - b.scheduleDateObject,
                  )[0]
                : null;

        const platformCounts = {};

        validPosts.forEach((post) => {
            platformCounts[post.platform] =
                (platformCounts[post.platform] || 0) + 1;
        });

        const platformDistribution = Object.entries(platformCounts).sort(
            (a, b) => b[1] - a[1],
        );

        const mostActivePlatform = platformDistribution[0]?.[0] ?? "—";

        const validDates = validPosts
            .map((post) => post.scheduleDateObject)
            .filter(Boolean);

        let averagePostsPerWeek = "—";

        if (validDates.length >= 2) {
            const earliest = new Date(
                Math.min(...validDates.map((d) => d.getTime())),
            );

            const latest = new Date(
                Math.max(...validDates.map((d) => d.getTime())),
            );

            const weeks = Math.max(
                1,
                Math.ceil((latest - earliest) / (1000 * 60 * 60 * 24 * 7)),
            );

            averagePostsPerWeek = (validPosts.length / weeks).toFixed(1);
        } else if (validPosts.length) {
            averagePostsPerWeek = validPosts.length;
        }

        const completionRate =
            validPosts.length > 0
                ? Math.round((publishedPosts.length / validPosts.length) * 100)
                : 0;

        return {
            overview: [
                {
                    title: "Total Posts",
                    value: validPosts.length,
                    subtitle: `${postsThisMonth} scheduled this month`,
                    icon: Files,
                    accent: "blue",
                },
                {
                    title: "Published",
                    value: publishedPosts.length,
                    subtitle: `${completionRate}% completion`,
                    icon: CircleCheckBig,
                    accent: "green",
                },
                {
                    title: "Scheduled",
                    value: scheduledPosts.length,
                    subtitle: `${postsThisWeek} this week`,
                    icon: CalendarClock,
                    accent: "purple",
                },
                {
                    title: "Drafts",
                    value: draftPosts.length,
                    subtitle: "Awaiting review",
                    icon: FilePenLine,
                    accent: "orange",
                },
            ],

            metrics: [
                {
                    title: "Upcoming",
                    value: upcomingPosts.length,
                    icon: Clock3,
                },
                {
                    title: "This Week",
                    value: postsThisWeek,
                    icon: TrendingUp,
                },
                {
                    title: "This Month",
                    value: postsThisMonth,
                    icon: CalendarDays,
                },
                {
                    title: "Top Platform",
                    value: mostActivePlatform,
                    icon: Globe2,
                },
                {
                    title: "Avg / Week",
                    value: averagePostsPerWeek,
                    icon: BarChart3,
                },
                {
                    title: "Next Publish",
                    value: nextScheduledPost
                        ? nextScheduledPost.scheduleDateObject.toLocaleDateString(
                              "en-IN",
                              {
                                  day: "numeric",
                                  month: "short",
                              },
                          )
                        : "—",
                    icon: ArrowRightCircle,
                },
            ],

            platformDistribution,

            totalPosts: validPosts.length,
        };
    }, [posts]);

    return (
        <section className="stats-wrap">
            <div className="stats-overview">
                {analytics.overview.map((card) => {
                    const Icon = card.icon;

                    return (
                        <article
                            key={card.title}
                            className={`card overview-card ${card.accent}`}
                        >
                            <div className="overview-top">
                                <div className="overview-icon">
                                    <Icon size={22} />
                                </div>

                                <span>{card.title}</span>
                            </div>

                            <div className="overview-middle">
                                <h2>{card.value}</h2>
                            </div>

                            <p>{card.subtitle}</p>
                        </article>
                    );
                })}
            </div>

            <div className="stats-bottom">
                <article className="card metrics-card">
                    <div className="section-title">
                        <div>
                            <h3>Quick Metrics</h3>
                            <p>Publishing overview</p>
                        </div>
                    </div>

                    <div className="metrics-grid">
                        {analytics.metrics.map((metric) => {
                            const Icon = metric.icon;

                            return (
                                <div key={metric.title} className="metric-item">
                                    <div className="metric-info">
                                        <Icon size={18} />

                                        <span>{metric.title}</span>
                                    </div>

                                    <strong>{metric.value}</strong>
                                </div>
                            );
                        })}
                    </div>
                </article>

                <article className="card distribution-card">
                    <div className="section-title">
                        <div>
                            <h3>Platform Distribution</h3>

                            <p>Content across platforms</p>
                        </div>
                    </div>

                    <div className="distribution-list">
                        {analytics.platformDistribution.map(
                            ([platform, count]) => {
                                const share = analytics.totalPosts
                                    ? Math.round(
                                          (count / analytics.totalPosts) * 100,
                                      )
                                    : 0;

                                return (
                                    <div
                                        key={platform}
                                        className="distribution-item"
                                    >
                                        <div className="distribution-header">
                                            <span>{platform}</span>

                                            <div>
                                                <strong>{count}</strong>

                                                <small>{share}%</small>
                                            </div>
                                        </div>

                                        <div className="distribution-track">
                                            <div
                                                className="distribution-fill"
                                                style={{
                                                    width: `${share}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default StatsCards;
