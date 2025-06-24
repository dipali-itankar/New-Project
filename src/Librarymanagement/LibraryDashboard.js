import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import './LibraryDashboard.css'; // CSS file below

const LibraryDashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`dashboard-wrapper ${collapsed ? "sidebar-collapsed" : ""}`}>
      
      {/* Top Navbar */}
      <Navbar className="custom-navbar">
        <Button className="toggle-btn me-3" onClick={toggleSidebar}>
          <FaBars className="toggle-icon" />
        </Button>

        {/* Centered Title */}
        <div className="navbar-title-center">
          <span className="navbar-title">📘 Library Management</span>
        </div>

        <Navbar.Collapse className="justify-content-end">
          <Button className="logout-btn" onClick={handleLogout}>🔒 Logout</Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="content-wrapper">
        {/* Sidebar */}
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-content">
            <Nav className="flex-column w-100">
              <NavLink to="" end className="nav-link">
                <span className="icon">🏠</span>
                <span className="label">Dashboard</span>
              </NavLink>
              <NavLink to="inventory" className="nav-link">
                <span className="icon">📚</span>
                <span className="label">Book Inventory</span>
              </NavLink>
              <NavLink to="issue-return" className="nav-link">
                <span className="icon">🔄</span>
                <span className="label">Issue/Return</span>
              </NavLink>
              <NavLink to="fine" className="nav-link">
                <span className="icon">💰</span>
                <span className="label">Fine Calculation</span>
              </NavLink>
            </Nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
