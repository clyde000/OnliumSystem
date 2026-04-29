/**
 * Example Dashboard Component using API
 * Shows how to fetch and display data from API
 */

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { studentService } from "../../services/studentService";

function ExampleDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await studentService.getDashboard();

        if (result.success) {
          setDashboard(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>
        Welcome, {user?.firstName} {user?.lastName}
      </h1>

      {dashboard && (
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Enrolled Programs</h3>
              <p className="stat-value">
                {dashboard.stats?.enrolledPrograms || 0}
              </p>
            </div>
            <div className="stat-card">
              <h3>Completed Courses</h3>
              <p className="stat-value">
                {dashboard.stats?.completedCourses || 0}
              </p>
            </div>
            <div className="stat-card">
              <h3>Upcoming Appointments</h3>
              <p className="stat-value">
                {dashboard.stats?.upcomingAppointments || 0}
              </p>
            </div>
          </div>

          {dashboard.recentActivity && (
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <ul>
                {dashboard.recentActivity.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExampleDashboard;
