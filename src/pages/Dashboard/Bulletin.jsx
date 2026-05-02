import "./styles/Bulletin.css";

const BULLETIN = [
  "Enrollment deadline extended",
  "LMS orientation — new students",
  "Scholarship applications open",
];

export default function Bulletin() {
  return (
    <div className="card">
      <div className="card-title">Bulletin</div>
      {BULLETIN.map((item) => (
        <div className="bulletin-item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}