import { useState } from "react";
import "./ResourcesStudent.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const resources = [
  {
    id: 1,
    title: "LMS Quiz Link",
    url: "https://lms.onlium.edu/quiz/",
    status: "Available",
    type: "Quiz"
  },
  {
    id: 2,
    title: "LMS Exam Link",
    url: "https://lms.onlium.edu/exam",
    status: "Available",
    type: "Exam"
  }
];

export default function ResourcesStudent() {
  const [copiedId, setCopiedId] = useState(null);
  const [activeNav, setActiveNav] = useState("Resources");

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpen = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="portal">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main">
        <Topbar />
        <div className="content">
          <div className="resources-student">
            <div className="resources-header-student">
              <h1>Resources</h1>
              <p>BS Information Technology — 2nd Year</p>
            </div>

            <div className="resources-card">
              <div className="success-banner">
                <div className="check-icon">✓</div>
                <p>LMS links are available today. Click "Open" to access your quiz or exam.</p>
              </div>

              <div className="resources-list">
                {resources.map((resource) => (
                  <div key={resource.id} className="resource-item">
                    <div className="resource-header">
                      <h3>{resource.title}</h3>
                      <span className="status-badge">{resource.status}</span>
                    </div>
                    <div className="resource-actions">
                      <input
                        type="text"
                        className="resource-url"
                        value={resource.url}
                        readOnly
                      />
                      <button
                        className="open-btn"
                        onClick={() => handleOpen(resource.url)}
                      >
                        Open
                      </button>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(resource.url, resource.id)}
                      >
                        {copiedId === resource.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
