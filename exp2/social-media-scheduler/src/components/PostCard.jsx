import { useDispatch } from "react-redux";

import {
    CalendarDays,
    Pencil,
    Trash2,
    Globe,
    CheckCircle2,
    Clock3,
    FileText,
    ChevronDown,
} from "lucide-react";

import {
    deletePost,
    updateStatus,
    setEditingPost,
} from "../features/posts/postsSlice";

import { STATUS } from "../constants/status";
import { formatDate } from "../utils/date";
import { notify } from "../utils/toast";

function PostCard({ post, showContent = true }) {
    const dispatch = useDispatch();

    const formattedDate = formatDate(post.scheduleDate);

    function handleStatusChange(e) {
        const status = e.target.value;

        dispatch(
            updateStatus({
                id: post.id,
                status,
            }),
        );

        if (status === STATUS.PUBLISHED) {
            notify.published();
        }
    }

    function handleEdit() {
        dispatch(setEditingPost(post));
    }

    function handleDelete() {
        dispatch(deletePost(post.id));
        notify.deleted();
    }

    function getStatusIcon() {
        switch (post.status) {
            case STATUS.PUBLISHED:
                return <CheckCircle2 size={15} />;

            case STATUS.SCHEDULED:
                return <Clock3 size={15} />;

            default:
                return <FileText size={15} />;
        }
    }

    return (
        <article className="post-card">
            <div className="post-card-top">
                <div className="post-platform">
                    <div className="post-platform-icon">
                        <Globe size={15} />
                    </div>

                    <span>{post.platform}</span>
                </div>

                <div className={`post-status ${post.status.toLowerCase()}`}>
                    {getStatusIcon()}
                    <span>{post.status}</span>
                </div>
            </div>

            <div className="post-card-body">
                <h3 className="post-title">{post.title}</h3>

                {showContent && <p className="post-content">{post.content}</p>}
            </div>

            <div className="post-meta">
                <div className="post-date">
                    <CalendarDays size={15} />

                    <span>{formattedDate}</span>
                </div>
            </div>

            <div className="post-divider" />

            <div className="post-actions">
                <div className="status-select-wrapper">
                    <select value={post.status} onChange={handleStatusChange}>
                        <option value={STATUS.DRAFT}>{STATUS.DRAFT}</option>

                        <option value={STATUS.SCHEDULED}>
                            {STATUS.SCHEDULED}
                        </option>

                        <option value={STATUS.PUBLISHED}>
                            {STATUS.PUBLISHED}
                        </option>
                    </select>

                    <ChevronDown size={16} />
                </div>

                <div className="post-buttons">
                    <button className="edit-post-btn" onClick={handleEdit}>
                        <Pencil size={16} />
                        <span>Edit</span>
                    </button>

                    <button className="delete-post-btn" onClick={handleDelete}>
                        <Trash2 size={16} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default PostCard;
