import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  selectPost,
} from "../features/posts/postSlice";

function PostCard({ onEdit }) {
  const dispatch = useDispatch();

  const selectedPost = useSelector(
    (state) => state.posts.selectedPost
  );

  if (!selectedPost) {
    return (
      <div className="post-card">
        <h2>Post Details</h2>
        <p>Select an event from the calendar.</p>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Delete this post?"
    );

    if (confirmDelete) {
      dispatch(deletePost(selectedPost.id));
      dispatch(selectPost(null));
    }
  };

  return (
    <div className="post-card">

      <h2>{selectedPost.title}</h2>

      <div className="post-details">

        <p>
          <strong>Platform:</strong>{" "}
          {selectedPost.platform}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedPost.status}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {selectedPost.date}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {selectedPost.time}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{selectedPost.description}</p>

      </div>

      <div className="post-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(selectedPost)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default PostCard;