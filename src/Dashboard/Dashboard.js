import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  EventNote as AttendanceIcon,
  AccessTime as TimetableIcon,
  Mail as MailIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const fullDrawerWidth = 240;
const miniDrawerWidth = 70;

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Assignments", icon: <AssignmentIcon />, path: "/dashboard/assignments" },
  { text: "Attendance", icon: <AttendanceIcon />, path: "/dashboard/attendance" },
  { text: "Timetable", icon: <TimetableIcon />, path: "/dashboard/timetable" },
  { text: "Messages", icon: <MailIcon />, path: "/dashboard/messages" },
  { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
  { text: "TeacherAttendance", icon: <AttendanceIcon />, path: "/dashboard/TeacherAttendance" },
];

const TeacherDashboard = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setOpen(!open);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const drawerWidth = open ? fullDrawerWidth : miniDrawerWidth;

  return (
    <Box sx={{ display: "flex", width: "100vw", overflowX: "hidden" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
          color: "#fff",
          transition: "all 0.3s ease",
          pl: open ? `${drawerWidth}px` : `${miniDrawerWidth}px`,
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            🎓 Teacher Dashboard
          </Typography>
          <Tooltip title="Help">
            <IconButton color="inherit">
              <HelpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
            color: "#fff",
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: "width 0.3s",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: open ? "center" : "center", px: 2 }}>
          <Typography variant="h6" sx={{ display: open ? "block" : "none", fontWeight: 600 }}>
            Menu
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
        <List>
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.text}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: "#fff",
                backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                margin: "4px 8px",
                borderRadius: 8,
              })}
            >
              <ListItem button sx={{ px: 2.5 }}>
                <ListItemIcon sx={{ color: "#fff", minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
          transition: "margin 0.3s",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
