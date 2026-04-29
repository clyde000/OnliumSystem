import { useEffect, useState } from "react";
import { studentService } from "../../services/studentService";
import "./Appointments.css";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await studentService.getAppointments();
        if (result.success) {
          setAppointments(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return (
      <div className="card">
        <div className="card-title">Appointments</div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="card">
        <div className="card-title">Appointments</div>
        <p>Error: {error}</p>
      </div>
    );
  return (
    <div className="card">
      <div className="card-title">Appointments</div>
      {appointments.map((appt) => (
        <div className="appt-item" key={appt.label}>
          <div className={`appt-dot ${appt.status}`} />
          <div>
            <div className="appt-label">{appt.label}</div>
            <div className={`appt-status ${appt.status}`}>
              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
