import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomepageUniversity from "./pages/Homepage/HomepageUniversity.jsx";
import RegisterUniversity from "./pages/Register/RegisterUniversity.jsx";
import CreateAccount from "./pages/Register/CreateAccount.jsx";
import Login from "./pages/Register/Login.jsx";
import ModeratorLogin from "./pages/Register/ModeratorLogin.jsx";
import OnliumDashboard from "./pages/Dashboard/OnliumDashboard.jsx";
import EnrollmentPage from "./components/enrollment/EnrollmentPage.jsx";
import EnrollmentLayout from "./pages/Enrollment/EnrollmentLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomepageUniversity />} />
        <Route path="/apply-now" element={<div>Apply Now</div>} />
        <Route path="/login" element={<ModeratorLogin />} />
        <Route path="/register" element={<RegisterUniversity />} />
        <Route path="/register/create" element={<CreateAccount />} />
        <Route path="/register/login" element={<Login />} />
        <Route path="/register/moderator" element={<ModeratorLogin />} />
        <Route path="/dashboard" element={<OnliumDashboard />} />
        <Route path="/enrollment" element={<EnrollmentLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;