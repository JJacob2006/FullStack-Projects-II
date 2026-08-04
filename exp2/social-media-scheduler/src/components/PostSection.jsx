import { useSelector } from "react-redux";
import { SearchX, ArrowUpRight } from "lucide-react";

import PostCard from "./PostCard";

function PostSection({
    title,
    status,
    icon,
    emptyMessage,
    showContent = true,
}) {
    const {
        search,
        platform,
        status: selectedStatus,
    } = useSelector((state) => state.ui);

    const posts = useSelector((state) =>
        state.posts.posts.filter((post) => {
            const matchesSection = post.status === status;

            const matchesSearch =
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.content.toLowerCase().includes(search.toLowerCase());

            const matchesPlatform =
                platform === "All Platforms" || post.platform === platform;

            const matchesStatus =
                selectedStatus === "All Status" ||
                post.status === selectedStatus;

            return (
                matchesSection &&
                matchesSearch &&
                matchesPlatform &&
                matchesStatus
            );
        }),
    );

    return (
        <section className="post-section-card">
            <div className="post-section-header">
                <div className="post-section-title">
                    <div className="post-section-icon">{icon}</div>

                    <div>
                        <h2>{title}</h2>

                        <p>
                            {posts.length}{" "}
                            {posts.length === 1 ? "post" : "posts"} available
                        </p>
                    </div>
                </div>

                <div className="post-count-pill">{posts.length}</div>
            </div>

            {posts.length === 0 ? (
                <div className="post-empty-state" role="status">
                    <div className="post-empty-icon">
                        <SearchX size={34} />
                    </div>

                    <h3>No Posts Found</h3>

                    <p>{emptyMessage}</p>

                    <div className="post-empty-tip">
                        <ArrowUpRight size={16} />
                        <span>
                            Try changing your filters or create a new post.
                        </span>
                    </div>
                </div>
            ) : (
                <div className="post-list">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            showContent={showContent}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default PostSection;
