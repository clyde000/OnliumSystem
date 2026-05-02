import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomepageUniversity from "./pages/Homepage/HomepageUniversity.jsx";
import RegisterUniversity from "./pages/Register/RegisterUniversity.jsx";
import CreateAccount from "./pages/Register/CreateAccount.jsx";
import Login from "./pages/Register/Login.jsx";
import ModeratorLogin from "./pages/Register/ModeratorLogin.jsx";
import AdminDashboard from "./Admin/dashboardadmin.jsx";
import StudentManagement from "./Admin/StudentManagement.jsx";
import CourseCurriculum from "./Admin/CourseCurriculum.jsx";
import Bulletin from "./Admin/Bulletin.jsx";
import ResourcesAdmin from "./Admin/Resources.jsx";
import Layout from "./Admin/layout.jsx";
import AdminAppointments from "./Admin/AdminAppointments.jsx";
import OnliumDashboard from "./pages/Dashboard/OnliumDashboard.jsx";
import ResourcesStudent from "./pages/Dashboard/ResourcesStudent.jsx";
import AppointmentStudent from "./pages/Dashboard/AppointmentStudent.jsx";
import NotificationsStudent from "./pages/Dashboard/NotificationsStudent.jsx";
import StudyloadStudent from "./pages/Dashboard/StudyloadStudent.jsx";
import EnrollmentPage from "./components/enrollment/EnrollmentPage.jsx";
import EnrollmentLayout from "./pages/Enrollment/EnrollmentLayout.jsx";
import Studyload from "./components/enrollment/Studyload.jsx";
import Resources from "./components/enrollment/Resources.jsx";
import Appointment from "./components/enrollment/Appointment.jsx";
import Notifications from "./pages/Dashboard/Notifications.jsx";
import AdminRoute from "./AdminRoute.jsx"; // ✅ add this

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

        {/* ✅ Admin routes now protected */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="resources" element={<ResourcesAdmin />} />
          <Route path="curriculum" element={<CourseCurriculum />} />
          <Route path="bulletin" element={<Bulletin />} />
          <Route path="appointments" element={<AdminAppointments />} />
        </Route>

        <Route path="/dashboard" element={<OnliumDashboard />} />
        <Route path="/student/resources" element={<ResourcesStudent />} />
        <Route path="/student/appointments" element={<AppointmentStudent />} />
        <Route path="/student/notifications" element={<NotificationsStudent />} />
        <Route path="/student/studyload" element={<StudyloadStudent />} />
        <Route path="/studyload" element={<Studyload />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/enrollment" element={<EnrollmentLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;