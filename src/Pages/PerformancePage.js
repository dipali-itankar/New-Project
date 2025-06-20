import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Add, Delete, AccessTime, Event, Notes } from "@mui/icons-material";

const shiftOptions = [
  { label: "Morning Shift", in: "08:00", out: "14:00" },
  { label: "Evening Shift", in: "14:00", out: "20:00" },
  { label: "Night Shift", in: "20:00", out: "02:00" },
];

const statusOptions = ["Present", "Absent", "On Leave", "Late"];

const AdvancedTeacherAttendanceForm = () => {
  const [date, setDate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [summary, setSummary] = useState({ Present: 0, Absent: 0, "On Leave": 0, Late: 0 });

  const [records, setRecords] = useState([
    { name: "", shift: "", clockIn: "", clockOut: "", status: "", remarks: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...records];
    updated[index][field] = value;

    if (field === "shift") {
      const shift = shiftOptions.find((s) => s.label === value);
      if (shift) {
        updated[index].clockIn = shift.in;
        updated[index].clockOut = shift.out;
      }
    }

    setRecords(updated);
  };

  const addTeacherRow = () => {
    setRecords([
      ...records,
      { name: "", shift: "", clockIn: "", clockOut: "", status: "", remarks: "" },
    ]);
  };

  const removeTeacherRow = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSummary = { Present: 0, Absent: 0, "On Leave": 0, Late: 0 };
    records.forEach((rec) => {
      if (newSummary[rec.status] !== undefined) {
        newSummary[rec.status]++;
      }
    });

    setSummary(newSummary);
    setOpenSnackbar(true);

    console.log("Attendance Date:", date);
    console.log("Submitted Records:", records);

    // Reset form
    setDate("");
    setRecords([{ name: "", shift: "", clockIn: "", clockOut: "", status: "", remarks: "" }]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#1976d2" }}>
       Teacher Daily Attendance
      </Typography>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              📅 Attendance Date
            </Typography>
            <TextField
              type="date"
              label="Select Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {records.map((teacher, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ mb: 2, borderRadius: 3, backgroundColor: "#fafafa" }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  👤
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Name"
                      value={teacher.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      select
                      label="Shift"
                      value={teacher.shift}
                      onChange={(e) => handleChange(index, "shift", e.target.value)}
                      fullWidth
                      required
                    >
                      {shiftOptions.map((s, i) => (
                        <MenuItem key={i} value={s.label}>
                          {s.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      type="time"
                      label="Clock In"
                      value={teacher.clockIn}
                      onChange={(e) => handleChange(index, "clockIn", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      type="time"
                      label="Clock Out"
                      value={teacher.clockOut}
                      onChange={(e) => handleChange(index, "clockOut", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      select
                      label="Status"
                      value={teacher.status}
                      onChange={(e) => handleChange(index, "status", e.target.value)}
                      fullWidth
                      required
                    >
                      {statusOptions.map((opt, idx) => (
                        <MenuItem key={idx} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Remarks (optional)"
                      value={teacher.remarks}
                      onChange={(e) => handleChange(index, "remarks", e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Notes />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="right">
                    <Tooltip title="Remove Teacher">
                      <IconButton
                        onClick={() => removeTeacherRow(index)}
                        color="error"
                        disabled={records.length === 1}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" startIcon={<Add />} onClick={addTeacherRow}>
              Add More Teacher
            </Button>
            <Button variant="contained" type="submit" startIcon={<AccessTime />}>
              Submit Attendance
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Attendance Summary */}
      <Box mt={5}>
  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
    Attendance Summary (Current Submission)
  </Typography>

  <Grid container spacing={3}>
    {Object.entries(summary).map(([key, value]) => {
      const colorMap = {
        Present: "#4caf50", // green
        Absent: "#f44336", // red
        Late: "#ff9800", // orange
        "On Leave": "#607d8b", // blue-gray
      };

      const iconMap = {
        Present: "✅",
        Absent: "❌",
        Late: "⏰",
        "On Leave": "🛌",
      };

      return (
        <Grid item xs={12} sm={6} md={3} key={key}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colorMap[key]}22, ${colorMap[key]}11)`,
              borderLeft: `6px solid ${colorMap[key]}`,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: colorMap[key], fontWeight: 600, mb: 1 }}
            >
              {iconMap[key]} {key}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: colorMap[key] }}>
              {value}
            </Typography>
          </Paper>
        </Grid>
      );
    })}
  </Grid>
</Box>


      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Attendance submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdvancedTeacherAttendanceForm;
