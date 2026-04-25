import { useState } from "react";
import "./CourseCurriculum.css";

const subjects = [
  { code: "IT 201", subject: "DATA STRUCTURES", units: "3", days: "MWF", time: "8-9 AM", room: "NLAB 2" },
  { code: "IT 202", subject: "OBJECT - ORIENTED PROG", units: "3", days: "TTH", time: "9-10:30AM", room: "SALB 1" },
  { code: "IT 203", subject: "DATABASE MANAGEMENT", units: "3", days: "MWF", time: "10-11AM", room: "SALB 2" },
  { code: "GE 211", subject: "ETHICS IN TECHNOLOGY", units: "3", days: "MWF", time: "1-2:30PM", room: "SALB 3" },
  { code: "PE 201", subject: "PHYSICAL EDUCATION 2", units: "2", days: "TTH", time: "3-5PM", room: "G" },
  { code: "IT 204", subject: "WEB DEVELOPMENT", units: "3", days: "MWF", time: "5-6PM", room: "SALB 4" },
  { code: "IT 205", subject: "SYSTEM ANALYSIS", units: "3", days: "MWF", time: "6-7PM", room: "209" },
];

const students = [
  { id: 1, name: "Ron, Regodo", program: "bsit", year: "2nd Year", initials: "RR", color: "#3b82f6" },
  { id: 2, name: "Yanzie, Suson", program: "bscs", year: "1st Year", initials: "YS", color: "#22c55e" },
  { id: 3, name: "Jessa Surigao", program: "bsece", year: "3rd Year", initials: "JS", color: "#eab308" },
];

export default function CourseCurriculum() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  return (
    <div className="course-curriculum">
      <div className="page-header">
        <h1>Course Curriculum</h1>
      </div>

      <div className="curriculum-content">
        <div className="left-section">
          <div className="subjects-card">
            <div className="subjects-header">
              <h3>Assigned Subjects - Regodo, Ron</h3>
              <span className="total-units">Total 21 Units</span>
            </div>

            <table className="subjects-table">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>SUBJECT</th>
                  <th>UNITS</th>
                  <th>DAYS</th>
                  <th>TIME</th>
                  <th>ROOM</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subj, index) => (
                  <tr key={index}>
                    <td>{subj.code}</td>
                    <td>{subj.subject}</td>
                    <td>{subj.units}</td>
                    <td>{subj.days}</td>
                    <td>{subj.time}</td>
                    <td>{subj.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="save-btn">Save Study Load</button>
        </div>

        <div className="right-section">
          <div className="select-student-card">
            <h3>Select Student</h3>
            <div className="student-search">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search student name or ID..." />
            </div>

            <div className="student-list">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`student-item ${selectedStudent.id === student.id ? "selected" : ""}`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="student-avatar-small" style={{ background: student.color }}>
                    {student.initials}
                  </div>
                  <div className="student-details">
                    <p className="student-name">{student.name}</p>
                    <p className="student-program">{student.program} {student.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="assign-curriculum-card">
            <h3>Assign Curriculum</h3>
            
            <div className="form-group">
              <label>Program</label>
              <select className="curriculum-select">
                <option>BS INFORMATION TECHNOLOGY</option>
              </select>
            </div>

            <div className="form-group">
              <label>Curriculum Plan</label>
              <select className="curriculum-select">
                <option>BSIT-2023 (CURRENT)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Year Level</label>
              <select className="curriculum-select">
                <option>2ND YEAR - 1ST SEMESTER</option>
              </select>
            </div>

            <button className="assign-btn">Assign Study Load</button>
          </div>
        </div>
      </div>
    </div>
  );
}
