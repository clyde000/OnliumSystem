import { useState } from "react";
import "./Resources.css";

const categories = ["Quiz", "Exam", "Assignment", "Reference"];

export default function ResourcesAdmin() {
  const [selectedCategory, setSelectedCategory] = useState("Quiz");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [visibleTo, setVisibleTo] = useState("All students");
  const [deadline, setDeadline] = useState("");

  const handlePostLink = () => {
    console.log({ title, category: selectedCategory, url, visibleTo, deadline });
    setShowForm(false);
    setTitle("");
    setUrl("");
    setDeadline("");
  };

  return (
    <div className="resources-admin">
      <div className="resources-header">
        <div className="header-left">
          <h1>Resources</h1>
          <p>Manage and share LMS links with students</p>
        </div>
        <button className="post-link-btn" onClick={() => setShowForm(true)}>
          + Post a link
        </button>
      </div>

      {showForm && (
        <div className="resources-form-card">
          <h2>Post a new resource link</h2>
          
          <div className="form-row">
            <div className="form-group large">
              <label>Link title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Midterm Exam — June 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>LMS URL</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://lms.school.edu/quiz/123"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <span className="helper-text">Paste the full link from your LMS platform</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Visible to</label>
              <select
                className="form-select"
                value={visibleTo}
                onChange={(e) => setVisibleTo(e.target.value)}
              >
                <option>All students</option>
                <option>1st Year Students</option>
                <option>2nd Year Students</option>
                <option>3rd Year Students</option>
                <option>4th Year Students</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Deadline <span className="optional">(optional)</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="dd/mm/yyyy"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="cancel-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="submit-btn" onClick={handlePostLink}>
              + Post link
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="resources-list">
          <p className="empty-state">No resources posted yet. Click "Post a link" to add resources.</p>
        </div>
      )}
    </div>
  );
}
