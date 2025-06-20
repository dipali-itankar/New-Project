import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { PieChart, Pie, Cell } from "recharts";
import { getAttendanceRecords } from "./AttendanceData";

const COLORS = ["#4caf50", "#f44336"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getLast7Days = () => {
  const today = new Date();
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    last7Days.push(day.toISOString().split("T")[0]); // Format: yyyy-mm-dd
  }
  return last7Days;
};

const formatDateWithDay = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = daysOfWeek[dateObj.getDay()];
  return `${day}, ${dateObj.toLocaleDateString()}`;
};

const StudentAttendanceTracker = () => {
  const [name, setName] = useState("");
  const [weeklyAttendance, setWeeklyAttendance] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCheckAttendance = () => {
    if (name.trim() === "") return;

    const records = getAttendanceRecords();
    const last7Days = getLast7Days();

    const filtered = records.filter(
      (r) =>
        r.studentName.toLowerCase() === name.trim().toLowerCase() &&
        last7Days.includes(r.date)
    );

    setWeeklyAttendance(filtered);
    setOpenSnackbar(true);
  };

  const present = weeklyAttendance.filter((r) => r.status === "Present");
  const absent = weeklyAttendance.filter((r) => r.status === "Absent");
  const total = weeklyAttendance.length;

  const presentPercentage = total ? Math.round((present.length / total) * 100) : 0;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          📘 Weekly Attendance Tracker
        </Typography>

        <Box display="flex" gap={2} alignItems="center" mb={3}>
          <TextField
            label="Enter Your Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckAttendance}
          >
            Check
          </Button>
        </Box>

        {weeklyAttendance.length > 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={5}>
              <Typography variant="h6" gutterBottom textAlign="center">
                Last 7 Days Summary
              </Typography>
              <PieChart width={200} height={200}>
                <Pie
                  data={[
                    { name: "Present", value: present.length },
                    { name: "Absent", value: absent.length },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
              </PieChart>
              <Typography variant="h5" align="center" fontWeight="bold" sx={{ mt: -2 }}>
                {presentPercentage}%
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="green" mb={1}>
                    ✅ Present Days
                  </Typography>
                  <List dense sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {present.length > 0 ? (
                      present.map((a, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary={formatDateWithDay(a.date)} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No present records." />
                      </ListItem>
                    )}
                  </List>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="error.main" mb={1}>
                    ❌ Absent Days
                  </Typography>
                  <List dense sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {absent.length > 0 ? (
                      absent.map((a, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <Cancel color="error" />
                          </ListItemIcon>
                          <ListItemText primary={formatDateWithDay(a.date)} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No absent records." />
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Attendance data loaded for the week!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentAttendanceTracker;
