import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Chip,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { CalendarMonth, CheckCircle, Cancel } from "@mui/icons-material";

const leaveTypes = [
  "Sick Leave",
  "Casual Leave",
  "Maternity/Paternity Leave",
  "Earned Leave",
  "Unpaid Leave",
];

const LeaveFormOnly = () => {
  const [leave, setLeave] = useState({
    name: "",
    department: "",
    designation: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setLeave({
      name: "",
      department: "",
      designation: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Data:", leave);
    setOpenSnackbar(true);
    handleReset();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ borderRadius: 3 }} elevation={4}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Leave Application
          </Typography>
          <Divider sx={{ mb: 2 }}>
            <Chip icon={<CalendarMonth />} label="Leave Details" />
          </Divider>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Employee Name"
                  name="name"
                  fullWidth
                  value={leave.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Department"
                  name="department"
                  fullWidth
                  value={leave.department}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Designation"
                  name="designation"
                  fullWidth
                  value={leave.designation}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  label="Leave Type"
                  name="leaveType"
                  fullWidth
                  value={leave.leaveType}
                  onChange={handleChange}
                  required
                >
                  {leaveTypes.map((type, idx) => (
                    <MenuItem key={idx} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="date"
                  label="From Date"
                  name="fromDate"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={leave.fromDate}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="date"
                  label="To Date"
                  name="toDate"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={leave.toDate}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Reason"
                  name="reason"
                  fullWidth
                  multiline
                  rows={3}
                  value={leave.reason}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<CheckCircle />}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleReset}
                    startIcon={<Cancel />}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar Alert Positioned at Top */}
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
          ✅ Leave request submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LeaveFormOnly;
