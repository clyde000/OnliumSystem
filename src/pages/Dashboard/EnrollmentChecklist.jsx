import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./EnrollmentChecklist.css";

const ITEMS_DEFAULT = [
  { id: "personal", title: "Personal information" },
  { id: "upload", title: "Upload requirements" },
  { id: "program", title: "Select program" },
  { id: "schedule", title: "Choose schedule" },
  { id: "submit", title: "Submit requirements" },
  { id: "payment", title: "Finalize enrollment" },
];

export default function EnrollmentChecklist() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem("onlium_current_user");
    if (!raw) return setCurrentUser(null);
    try {
      const u = JSON.parse(raw);
      setCurrentUser(u);

      const key = `onlium_progress_${u.email}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setProgress(JSON.parse(saved));
      } else {
        // sensible defaults: personal info done for returning users
        const defaults = {
          personal: true,
          upload: false,
          program: true,
          schedule: true,
          submit: false,
          payment: false,
        };
        setProgress(defaults);
        localStorage.setItem(key, JSON.stringify(defaults));
      }
    } catch (err) {
      console.error(err);
      setCurrentUser(null);
    }
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    if (!currentUser) return;
    const key = `onlium_progress_${currentUser.email}`;
    localStorage.setItem(key, JSON.stringify(newProgress));
  };

  const toggle = (id) => {
    const next = { ...progress, [id]: !progress[id] };
    saveProgress(next);
  };

  if (!currentUser) {
    return (
      <div className="card">
        <div className="card-title">Enrollment steps</div>
        <div style={{ padding: 12 }}>
          <p>Please log in to view your enrollment progress.</p>
          <Link to="/register/login">Go to Log In</Link>
        </div>
      </div>
    );
  }

  const doneCount = ITEMS_DEFAULT.reduce((acc, it) => acc + (progress[it.id] ? 1 : 0), 0);
  const total = ITEMS_DEFAULT.length;

  const nextStep = ITEMS_DEFAULT.find((it) => !progress[it.id]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="card-title">Enrollment steps</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{`${doneCount} of ${total} complete`}</div>
        </div>
        <div>
          {nextStep ? (
            <button className="continue-link" onClick={() => navigate(`/apply-now?step=${nextStep.id}`)}>
              Continue →
            </button>
          ) : (
            <span style={{ color: "#10b981", fontWeight: 600 }}>All done</span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {ITEMS_DEFAULT.map((it) => {
          const done = !!progress[it.id];
          return (
            <div className="checklist-row" key={it.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="checkbox" checked={done} onChange={() => toggle(it.id)} />
                <div className="checklist-label">{it.title}</div>
              </div>
              <div>
                <span className={`status-pill ${done ? "status-done" : "status-pending"}`}>
                  {done ? "Done" : "Pending"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
