import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    CalendarDays,
    FileText,
    Pencil,
    Save,
    Send,
    ChevronDown,
    Sparkles,
} from "lucide-react";

import { STATUS } from "../constants/status";
import { notify } from "../utils/toast";

import {
    addPost,
    updatePost,
    clearEditingPost,
} from "../features/posts/postsSlice";

function CreatePost() {
    const dispatch = useDispatch();

    const editingPost = useSelector((state) => state.posts.editingPost);

    const platforms = useSelector((state) => state.platforms.platforms);

    const [formData, setFormData] = useState({
        platform: "Instagram",
        title: "",
        content: "",
        scheduleDate: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingPost) {
            setFormData({
                platform: editingPost.platform,
                title: editingPost.title,
                content: editingPost.content,
                scheduleDate: editingPost.scheduleDate,
            });

            setErrors({});
        }
    }, [editingPost]);

    const characterCount = formData.content.length;

    const remainingCharacters = useMemo(
        () => 280 - characterCount,
        [characterCount],
    );

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    function resetForm() {
        setFormData({
            platform: "Instagram",
            title: "",
            content: "",
            scheduleDate: "",
        });

        setErrors({});
        dispatch(clearEditingPost());
    }

    function validateForm() {
        const nextErrors = {};

        if (!formData.title.trim()) {
            nextErrors.title = "Please enter a title for this post.";
        }

        if (!formData.content.trim()) {
            nextErrors.content = "Your post content cannot be empty.";
        }

        if (!formData.scheduleDate) {
            nextErrors.scheduleDate = "Please choose a publishing date.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    }

    function save(status) {
        if (!validateForm()) return;

        if (editingPost) {
            dispatch(
                updatePost({
                    id: editingPost.id,
                    ...formData,
                    status,
                }),
            );

            notify.updated();
        } else {
            dispatch(
                addPost({
                    id: Date.now(),
                    ...formData,
                    status,
                }),
            );

            status === STATUS.DRAFT ? notify.draftSaved() : notify.scheduled();
        }

        resetForm();
    }

    return (
        <section className="composer-card">
            <div className="composer-header">
                <div className="composer-title">
                    <div className="composer-icon">
                        {editingPost ? (
                            <Pencil size={22} />
                        ) : (
                            <Sparkles size={22} />
                        )}
                    </div>

                    <div>
                        <h2>
                            {editingPost
                                ? "Edit Scheduled Post"
                                : "Create New Post"}
                        </h2>

                        <p>
                            {editingPost
                                ? "Modify your content before it goes live."
                                : "Write once and publish across multiple social platforms."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="composer-grid">
                <div className="form-group">
                    <label>Platform</label>

                    <div className="select-wrapper">
                        <select
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                        >
                            {platforms.map((platform) => (
                                <option key={platform.id} value={platform.name}>
                                    {platform.name}
                                </option>
                            ))}
                        </select>

                        <ChevronDown size={16} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Publish Date</label>

                    <div className="date-input">
                        <CalendarDays size={18} />

                        <input
                            type="date"
                            name="scheduleDate"
                            value={formData.scheduleDate}
                            onChange={handleChange}
                        />
                    </div>

                    {errors.scheduleDate && (
                        <p className="field-error">{errors.scheduleDate}</p>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label>Post Title</label>

                <input
                    type="text"
                    name="title"
                    placeholder="Summer Sale Announcement..."
                    value={formData.title}
                    onChange={handleChange}
                />

                {errors.title && <p className="field-error">{errors.title}</p>}
            </div>

            <div className="form-group">
                <div className="textarea-header">
                    <label>Content</label>

                    <div
                        className={`character-pill ${
                            remainingCharacters < 0 ? "danger" : ""
                        }`}
                    >
                        {characterCount}/280
                    </div>
                </div>

                <textarea
                    rows="8"
                    name="content"
                    placeholder="Share your story, promotion or announcement..."
                    value={formData.content}
                    onChange={handleChange}
                />

                <div className="progress-track">
                    <div
                        className={`progress-fill ${
                            remainingCharacters < 0 ? "danger" : ""
                        }`}
                        style={{
                            width: `${Math.min(
                                (characterCount / 280) * 100,
                                100,
                            )}%`,
                        }}
                    />
                </div>

                <div className="character-footer">
                    <span>
                        {remainingCharacters >= 0
                            ? `${remainingCharacters} characters remaining`
                            : `${Math.abs(
                                  remainingCharacters,
                              )} characters over limit`}
                    </span>
                </div>

                {errors.content && (
                    <p className="field-error">{errors.content}</p>
                )}
            </div>

            <div className="composer-actions">
                <button
                    className="draft-btn"
                    type="button"
                    onClick={() => save(STATUS.DRAFT)}
                >
                    <Save size={18} />

                    {editingPost ? "Update Draft" : "Save Draft"}
                </button>

                <button
                    className="schedule-btn"
                    type="button"
                    onClick={() => save(STATUS.SCHEDULED)}
                >
                    <Send size={18} />

                    {editingPost ? "Update Schedule" : "Schedule Post"}
                </button>
            </div>

            {editingPost && (
                <button
                    className="cancel-edit-btn"
                    onClick={resetForm}
                    type="button"
                >
                    Cancel Editing
                </button>
            )}
        </section>
    );
}

export default CreatePost;
