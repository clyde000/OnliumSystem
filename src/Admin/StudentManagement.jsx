import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import "./StudentManagement.css";

// Remove hardcoded data - will be fetched from API
const students = [];

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "status-active";
    case "pending":
      return "status-pending";
    case "inactive":
      return "status-inactive";
    default:
      return "status-default";
  }
};

export default function StudentManagement() {
  const [activeTab, setActiveTab] = useState("list");
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await adminService.getStudents();
        if (result.success) {
          setStudentList(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load students");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div className="student-management">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="student-management">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="student-management">
      <div className="page-header">
        <h1>Student Management</h1>
        <p>View and Manage all the students records</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          Students List
        </button>
        <button
          className={`tab ${activeTab === "application" ? "active" : ""}`}
          onClick={() => setActiveTab("application")}
        >
          View Student Application
        </button>
      </div>

      {activeTab === "list" && (
        <>
          <div className="filters">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search by name, id, program..." />
            </div>
            <div className="filter-dropdowns">
              <select className="filter-select">
                <option>All Programs</option>
              </select>
              <select className="filter-select">
                <option>All Year Levels</option>
              </select>
              <select className="filter-select">
                <option>All Gender</option>
              </select>
            </div>
          </div>

          <div className="status-filter">
            <select className="filter-select">
              <option>All Status</option>
            </select>
          </div>

          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>STUDENT ID</th>
                  <th>NAME</th>
                  <th>PROGRAM</th>
                  <th>YEAR</th>
                  <th>GENDER</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.program}</td>
                    <td>{student.year}</td>
                    <td>{student.gender}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "application" && (
        <>
          <div className="add-student-container">
            <button className="add-student-btn">+ Add Student</button>
          </div>
          <div className="application-cards">
            <div className="student-card">
              <div className="student-card-header">
                <div className="student-avatar">RR</div>
                <div className="student-info">
                  <h3>Regodo, Ron</h3>
                  <p className="year">1st Year</p>
                  <span className="new-badge">NEW</span>
                </div>
              </div>

              <div className="card-section">
                <h4>PERSONAL INFORMATION</h4>
                <div className="info-row">
                  <span>Full Name</span>
                  <span>Regodo, Ron A.</span>
                </div>
                <div className="info-row">
                  <span>Date of Birth</span>
                  <span>March 12, 2004</span>
                </div>
                <div className="info-row">
                  <span>Gender</span>
                  <span>Male</span>
                </div>
                <div className="info-row">
                  <span>Contact Number</span>
                  <span>+63 917 123 4567</span>
                </div>
                <div className="info-row">
                  <span>Email</span>
                  <span>ron.regodo.onlium.edu</span>
                </div>
                <div className="info-row">
                  <span>Address</span>
                  <span>Lapu-Lapu City</span>
                </div>
              </div>

              <div className="card-section">
                <h4>ACADEMIC</h4>
                <div className="info-row">
                  <span>Program</span>
                  <span>BS Information Technology</span>
                </div>
                <div className="info-row">
                  <span>Year Level</span>
                  <span>1st Year</span>
                </div>
                <div className="info-row">
                  <span>Department</span>
                  <span>College of Engineering & Technology</span>
                </div>
                <div className="info-row">
                  <span>Curriculum</span>
                  <span>BSIT-2023</span>
                </div>
              </div>

              <div className="card-section">
                <h4>REQUIREMENTS</h4>
                <div className="requirements">
                  <button className="req-btn">Report Card</button>
                  <button className="req-btn">Good Moral</button>
                  <button className="req-btn">PSA Birth Certificate</button>
                </div>
              </div>

              <div className="card-actions">
                <button className="approve-btn">Approved</button>
                <button className="reject-btn">Reject</button>
              </div>
            </div>

            <div className="student-card">
              <div className="student-card-header">
                <div className="student-avatar">RR</div>
                <div className="student-info">
                  <h3>Suson, Yanzie</h3>
                  <p className="year">2nd Year</p>
                  <span className="continuing-badge">Continuing student</span>
                </div>
              </div>

              <div className="card-section">
                <h4>PERSONAL INFORMATION</h4>
                <div className="info-row">
                  <span>Full Name</span>
                  <span>Suson, Yanzie</span>
                </div>
                <div className="info-row">
                  <span>Date of Birth</span>
                  <span>February 5, 2006</span>
                </div>
                <div className="info-row">
                  <span>Gender</span>
                  <span>Female</span>
                </div>
                <div className="info-row">
                  <span>Contact Number</span>
                  <span>+63 589 987 1259</span>
                </div>
                <div className="info-row">
                  <span>Email</span>
                  <span>yanzies@gmail.com</span>
                </div>
                <div className="info-row">
                  <span>Address</span>
                  <span>Lapu-Lapu City</span>
                </div>
              </div>

              <div className="card-section">
                <h4>ACADEMIC</h4>
                <div className="info-row">
                  <span>Program</span>
                  <span>BS Information Technology</span>
                </div>
                <div className="info-row">
                  <span>Year Level</span>
                  <span>2nd Year</span>
                </div>
                <div className="info-row">
                  <span>Department</span>
                  <span>College of Engineering & Technology</span>
                </div>
                <div className="info-row">
                  <span>Curriculum</span>
                  <span>BSIT 2024</span>
                </div>
              </div>

              <div className="card-section">
                <h4>REQUIREMENTS</h4>
                <div className="requirements single">
                  <button className="req-btn">Clearance</button>
                </div>
              </div>

              <div className="card-actions">
                <button className="approve-btn">Approved</button>
                <button className="reject-btn">Reject</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
