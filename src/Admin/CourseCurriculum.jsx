import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import "./CourseCurriculum.css";

// Remove hardcoded data - will be fetched from API
const subjects = [];
const studentsList = [];

export default function CourseCurriculum() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResult = await adminService.getStudents();
        const curriculumResult = await adminService.getCurriculum();

        if (studentsResult.success) {
          setStudentList(studentsResult.data);
          if (studentsResult.data.length > 0) {
            setSelectedStudent(studentsResult.data[0]);
          }
        }

        if (curriculumResult.success) {
          setSubjects(curriculumResult.data);
        } else {
          setError(curriculumResult.error);
        }
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="course-curriculum">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="course-curriculum">
        <p>Error: {error}</p>
      </div>
    );

  if (!selectedStudent)
    return (
      <div className="course-curriculum">
        <p>No students available</p>
      </div>
    );

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
                  <div
                    className="student-avatar-small"
                    style={{ background: student.color }}
                  >
                    {student.initials}
                  </div>
                  <div className="student-details">
                    <p className="student-name">{student.name}</p>
                    <p className="student-program">
                      {student.program} {student.year}
                    </p>
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
