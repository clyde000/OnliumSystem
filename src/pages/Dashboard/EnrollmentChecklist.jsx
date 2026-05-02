import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/EnrollmentChecklist.css";

const ALL_STEPS = [
  { id: "personal",  title: "Personal information" },
  { id: "upload",    title: "Upload requirements" },
  { id: "program",   title: "Select program" },
  { id: "schedule",  title: "Choose schedule" },
  { id: "submit",    title: "Submit requirements" },
];

function getStepsForType(studentType, irregular) {
  if (studentType === "continuing" && irregular === "yes") {
    return ALL_STEPS.filter(s => s.id !== "program" && s.id !== "schedule");
  }
  if (studentType === "continuing") {
    return ALL_STEPS.filter(s => s.id !== "program");
  }
  return ALL_STEPS;
}

export default function EnrollmentChecklist() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [studentType, setStudentType] = useState(null);
  const [irregular, setIrregular] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("onlium_current_user");
    if (!raw) return setCurrentUser(null);
    try {
      const u = JSON.parse(raw);
      setCurrentUser(u);

      // Load enrollment type
      const enrollment = localStorage.getItem("onlium_enrollment");
      if (enrollment) {
        const { studentType: st, irregular: irr } = JSON.parse(enrollment);
        setStudentType(st);
        setIrregular(irr);
      }

      // Load progress
      const key = `onlium_progress_${u.email}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setProgress(JSON.parse(saved));
      } else {
        setProgress({});
      }
    } catch (err) {
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

  const steps = getStepsForType(studentType, irregular);
  const doneCount = steps.reduce((acc, it) => acc + (progress[it.id] ? 1 : 0), 0);
  const total = steps.length;
  const nextStep = steps.find((it) => !progress[it.id]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="card-title">Enrollment steps</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {studentType ? (
              <span style={{ marginRight: 6 }}>
                {studentType === "continuing" && irregular === "yes" ? "Irregular · " :
                 studentType === "continuing" && irregular === "no" ? "Regular · " :
                 studentType === "new" ? "New Student · " :
                 studentType === "transferee" ? "Transferee · " : ""}
              </span>
            ) : null}
            {`${doneCount} of ${total} complete`}
          </div>
        </div>
        <div>
          {nextStep ? (
            <button className="continue-link" onClick={() => navigate("/enrollment")}>
              Continue →
            </button>
          ) : (
            <span style={{ color: "#10b981", fontWeight: 600 }}>All done ✓</span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {steps.map((it) => {
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