import "./layout.css";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet, useLocation } from "react-router-dom";

const pageTitles = {
  "/admin":            "Dashboard",
  "/admin/dashboard":  "Dashboard",
  "/admin/students":   "Student Management",
  "/admin/resources":  "Resources",
  "/admin/curriculum": "Course Curriculum",
  "/admin/bulletin":   "Bulletin",
};

export default function Layout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-body">
        <TopBar title={title} subtitle="SY 2026" />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}