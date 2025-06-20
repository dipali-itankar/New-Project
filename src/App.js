import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import DashboardHome from "./Dashboard/DashboardHome";
import Assignments from "./Dashboard/Assignments";
import Attendance from "./Dashboard/Attendance";
import Timetable from "./Dashboard/Timetable";
import Messages from "./Dashboard/Messages";
import Settings from "./Dashboard/Settings";
import Login from "./Login/Login";
import ProfileManagement from "./Pages/ProfileManagement";
import LeaveAttendance from "./Pages/LeaveAttendance";
import PayrollPage from "./Pages/PayrollPage";
import PerformancePage from "./Pages/PerformancePage";
import TeacherAttendance from "./Dashboard/TeacherAttendance";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="TeacherAttendance" element={<TeacherAttendance />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="leave-attendance" element={<LeaveAttendance />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="performance" element={<PerformancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
