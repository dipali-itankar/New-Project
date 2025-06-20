import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  EventNote,
  AttachMoney,
  BarChart,
} from "@mui/icons-material";

const menuItems = [
  {
    title: "Profile Management",
    icon: <AccountCircle sx={{ fontSize: 40, color: "#1976d2" }} />,
    path: "/dashboard/profile",
    description: "View & update your personal information",
  },
  {
    title: "Leave Application",
    icon: <EventNote sx={{ fontSize: 40, color: "#4caf50" }} />,
    path: "/dashboard/leave-attendance",
    description: "Apply leave and view your attendance",
  },
  {
    title: "Payroll Processing",
    icon: <AttachMoney sx={{ fontSize: 40, color: "#f44336" }} />,
    path: "/dashboard/payroll",
    description: "Access payroll statements and history",
  },
  {
    title: "Attendance Tracking",
    icon: <BarChart sx={{ fontSize: 40, color: "#ff9800" }} />,
    path: "/dashboard/performance",
    description: "Daily presenty feel",
  },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box px={2} py={3}>
      {/* Heading */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: theme.palette.primary.main }}
      >
        👋 Welcome back, Teacher
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Access all your tools and information from a single dashboard.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Feature Cards */}
      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={4}
              onClick={() => navigate(item.path)}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#ffffff",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#f0f8ff",
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                },
              }}
            >
              {item.icon}
              <Typography variant="h6" sx={{ mt: 1.5, fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardHome;
