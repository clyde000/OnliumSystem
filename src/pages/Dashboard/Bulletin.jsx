import { useEffect, useState } from "react";
import { studentService } from "../../services/studentService";
import "./Bulletin.css";

export default function Bulletin() {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBulletins = async () => {
      try {
        // Using admin service or student service depending on your API
        const result = await studentService.getResources();
        if (result.success) {
          setBulletins(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load bulletins");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBulletins();
  }, []);

  if (loading)
    return (
      <div className="card">
        <div className="card-title">Bulletin</div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="card">
        <div className="card-title">Bulletin</div>
        <p>Error: {error}</p>
      </div>
    );
  return (
    <div className="card">
      <div className="card-title">Bulletin</div>
      {bulletins.map((item) => (
        <div className="bulletin-item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}
