import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomepageUniversity.css";

const courses = [
  {
    acronym: "BSA",
    fullname: "Bachelor of Science in Accountancy",
    desc: "Develop expertise in financial reporting, auditing, taxation, and accounting principles for business and government.",
  },
  {
    acronym: "BSBA",
    fullname: "Bachelor of Science in Business Administration",
    desc: "Gain a solid foundation in management, marketing, finance, and entrepreneurship to lead organizations effectively.",
  },
  {
    acronym: "BSHM",
    fullname: "Bachelor of Science in Hospitality Management",
    desc: "Prepare for careers in hotels, restaurants, tourism, and events with hands-on training and industry exposure.",
  },
  {
    acronym: "BSCS",
    fullname: "Bachelor of Science in Computer Science",
    desc: "Master algorithms, software engineering, artificial intelligence, and systems design for the tech industry.",
  },
  {
    acronym: "BSIT",
    fullname: "Bachelor of Science in Information Technology",
    desc: "Build skills in networking, web development, database management, and IT infrastructure for modern organizations.",
  },
];

export default function HomepageUniversity() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="onlium-root">

      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>

        {/* CENTER: nav links */}
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">About</a></li>
        </ul>

        {/* RIGHT: action buttons */}
        <div className="nav-actions">
          <button className="btn-outline" onClick={() => navigate("/login")}>
            Log in as moderator
          </button>
          <button className="btn-solid" onClick={() => navigate("/register/create")}>
            ENROLL NOW
          </button>
        </div>

      </nav>

      <section className="hero">
        <h1>Enroll in School<br />the Smart Way</h1>
        <p>
          Start your journey towards a brighter future. Join our school today and
          take the first step towards success with a simple and fast enrollment process.
        </p>
        <div className="hero-actions">
          <button className="btn-hero-primary">GET STARTED <span>→</span></button>
          <button className="btn-hero-outline">Log in as moderator</button>
        </div>
      </section>

      <div className="section-card">
        <h2>Enroll in Onlium the Smart Way</h2>
        <p className="section-subtitle">Choose your college program and take the first step toward your future career.</p>

        <div className="courses-grid">
          {courses.map((course, i) => (
            <div className="course-card" key={i}>
              <div className="course-acronym">{course.acronym}</div>
              <div className="course-fullname">{course.fullname}</div>
              <p className="course-desc">{course.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-bottom" />
    </div>
  );
}