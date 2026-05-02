import "./styles/Appointments.css";

const APPOINTMENTS = [
  { label: "Tuition walk-in", status: "confirmed" },
  { label: "Registrar pickup", status: "pending" },
];

export default function Appointments() {
  return (
    <div className="card">
      <div className="card-title">Appointments</div>
      {APPOINTMENTS.map((appt) => (
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