import { useState } from "react";

const limits = {
  Twitter: 280,
  LinkedIn: 3000,
  Facebook: 63206,
};

export default function PostComposer() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const limit = limits[platform];

  const remaining = limit - text.length;

  return (
  <div
    style={{
      width: "500px",
      margin: "50px auto",
      fontFamily: "Arial",
    }}
  >
    <h2>Post Composer</h2>


    <select
      value={platform}
      onChange={(e) => setPlatform(e.target.value)}
    >
      <option>Twitter</option>
      <option>LinkedIn</option>
      <option>Facebook</option>
    </select>

    <br />
    <br />


    <textarea
      rows="8"
      cols="60"
      placeholder="Write your post..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />


    <p>
      Characters: {text.length}/{limit}
    </p>


    {text.length === 0 && (
      <p style={{ color: "red" }}>
        Please enter a post before submitting.
      </p>
    )}

    {text.length > limit && (
      <p style={{ color: "red" }}>
        Character limit exceeded by {text.length - limit} characters.
      </p>
    )}

    {text.length > 0 && text.length <= limit && (
      <p style={{ color: "green" }}>
        ✓ Your post is ready to submit.
      </p>
    )}


    <button
      disabled={text.length === 0 || text.length > limit}
      onClick={() => alert("Post submitted successfully!")}
    >
      Submit Post
    </button>
  </div>
);
  
}