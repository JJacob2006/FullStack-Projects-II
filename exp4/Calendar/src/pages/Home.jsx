import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  addPost,
  updatePost,
} from "../features/posts/postSlice";

import MyCalendar from "../components/calendar";
import PostCard from "../components/postCard";

function Home() {
  const dispatch = useDispatch();

  const emptyForm = {
    title: "",
    description: "",
    platform: "Instagram",
    status: "Draft",
    date: "",
    time: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editing) {
      dispatch(updatePost(formData));
      setEditing(false);
    } else {
      dispatch(addPost(formData));
    }

    setFormData(emptyForm);
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">

      <h1>Social Media Post Scheduler</h1>

      <div className="dashboard">

        <div className="form-section">

          <h2>
            {editing ? "Edit Post" : "Schedule New Post"}
          </h2>

          <form
            className="post-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
            >
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Twitter</option>
              <option>LinkedIn</option>
              <option>YouTube</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Published</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />

            <button type="submit">
              {editing ? "Update Post" : "Add Post"}
            </button>

          </form>

          <PostCard onEdit={handleEdit} />

        </div>

        <div className="calendar-section">

          <MyCalendar />

        </div>

      </div>

    </div>
  );
}

export default Home;