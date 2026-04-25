import { useState } from "react";
import "./Bulletin.css";

const initialPosts = [
  {
    id: 1,
    title: "Enrollment Deadline Extended",
    date: "Apr 16, 2026",
    audience: "All Students",
    content: "The enrollment deadline for SY 2026 has been extended to Apr 30, 2026. Please complete all the requirements before the deadlines."
  },
  {
    id: 2,
    title: "LMS Orientation - New Students",
    date: "Apr 15, 2026",
    audience: "1st Year Students",
    content: "New Students are required to attend the LMS orientation on Apr 20, 2026. Details have been sent to your registered email."
  },
  {
    id: 3,
    title: "Scholarship Application Open",
    date: "Apr 12, 2026",
    audience: "All Students",
    content: "Scholarship application for SY 2026-2027 are now open. submit your application at the scholarship office."
  }
];

export default function Bulletin() {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = () => {
    if (title && content) {
      const newPost = {
        id: posts.length + 1,
        title,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        audience: "All Students",
        content
      };
      setPosts([newPost, ...posts]);
      setTitle("");
      setContent("");
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="bulletin">
      <div className="page-header">
        <h1>Bulletin</h1>
      </div>

      <div className="bulletin-content">
        <div className="create-post-card">
          <h2>Create Post</h2>
          <button className="bulletin-post-btn">Bulletin Post</button>
          
          <input
            type="text"
            className="post-input"
            placeholder="Post title (e.g. Enrollment Deadline Extended)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <textarea
            className="post-textarea"
            placeholder="Write your announcement here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <button className="publish-btn" onClick={handlePublish}>
            Publish to All Students
          </button>
        </div>

        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h3>{post.title}</h3>
                <div className="post-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
              <p className="post-meta">
                Posted {post.date} · {post.audience}
              </p>
              <p className="post-content">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
