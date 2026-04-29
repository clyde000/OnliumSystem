import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute, {
  AdminRoute,
  StudentRoute,
  PublicRoute,
} from "./components/ProtectedRoute";
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomepageUniversity />} />
          <Route path="/apply-now" element={<div>Apply Now</div>} />

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <ModeratorLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterUniversity />
              </PublicRoute>
            }
          />
          <Route
            path="/register/create"
            element={
              <PublicRoute>
                <CreateAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/register/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register/moderator"
            element={
              <PublicRoute>
                <ModeratorLogin />
              </PublicRoute>
            }
          />

          {/* Admin Routes */}
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
          </Route>

          {/* Student Routes */}
          <Route
            path="/dashboard"
            element={
              <StudentRoute>
                <OnliumDashboard />
              </StudentRoute>
            }
          />
          <Route
            path="/student/resources"
            element={
              <StudentRoute>
                <ResourcesStudent />
              </StudentRoute>
            }
          />
          <Route
            path="/student/appointments"
            element={
              <StudentRoute>
                <AppointmentStudent />
              </StudentRoute>
            }
          />
          <Route
            path="/student/notifications"
            element={
              <StudentRoute>
                <NotificationsStudent />
              </StudentRoute>
            }
          />
          <Route
            path="/student/studyload"
            element={
              <StudentRoute>
                <StudyloadStudent />
              </StudentRoute>
            }
          />

          {/* Enrollment Routes */}
          <Route
            path="/studyload"
            element={
              <ProtectedRoute>
                <Studyload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enrollment"
            element={
              <ProtectedRoute>
                <EnrollmentLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
