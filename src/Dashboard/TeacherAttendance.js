import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Snackbar,
  Alert,
  Paper,
  Slide,
} from "@mui/material";
import {
  getAttendanceRecords,
  saveAttendanceRecords,
} from "./AttendanceData";
import SchoolIcon from "@mui/icons-material/School";

const statusOptions = ["Present", "Absent"];

const TeacherAttendanceForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    date: "",
    status: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { studentName, date, status } = formData;

    if (!studentName || !date || !status) {
      setSnackbarMsg("⚠️ Please fill out all fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const records = getAttendanceRecords();
    const alreadyExists = records.some(
      (r) =>
        r.studentName.toLowerCase() === studentName.toLowerCase() &&
        r.date === date
    );

    if (alreadyExists) {
      setSnackbarMsg("⚠️ Attendance for this student on this date already exists.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    records.push(formData);
    saveAttendanceRecords(records);

    setSnackbarMsg("✅ Attendance submitted successfully!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setFormData({ studentName: "", date: "", status: "" });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: "#fefefe" }}>
          <Box textAlign="center" mb={3}>
            <SchoolIcon sx={{ fontSize: 50, color: "#1e88e5" }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              gutterBottom
              mt={1}
            >
              Mark Student Attendance
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Fill in the details to record student attendance.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                name="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                Submit Attendance
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Slide>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeacherAttendanceForm;
