import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Container,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const timeSlots = [
  "10:30–11:00", "11:00–11:30", "11:30–11:45",
  "11:45–12:15", "12:15–12:45", "12:45–1:00",
  "1:00–1:30", "1:30–2:00", "2:00–2:30",
  "2:30–3:00", "3:00–3:15", "3:15–3:45",
  "3:45–4:15", "4:15–4:45", "4:45–5:00",
];

const classList = ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const subjects = [
  "English", "Math", "Science", "History", "Drawing", "Dance",
  "Music", "Computer", "PT", "Activity", "Sports", "Marathi", "Practical",
];

const createEmptyTimetable = () => {
  const table = {};
  days.forEach((day) => {
    table[day] = new Array(timeSlots.length).fill("");
    table[day][2] = "Break";       // 11:30–11:45
    table[day][6] = "Tiffin Break"; // 1:00–1:30
    table[day][10] = "Break";      // 3:00–3:15
  });
  return table;
};

const TimeTablePage = () => {
  const [tab, setTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Class 6");
  const [timetables, setTimetables] = useState(() => {
    const obj = {};
    classList.forEach((cls) => {
      obj[cls] = createEmptyTimetable();
    });
    return obj;
  });

  const handleChangeTab = (_, newValue) => setTab(newValue);

  const handleSubjectChange = (day, index, value) => {
    setTimetables((prev) => {
      const updated = { ...prev };
      updated[selectedClass][day][index] = value;
      return { ...updated };
    });
  };

  const handleDeleteDay = (day) => {
    setTimetables((prev) => {
      const updated = { ...prev };
      updated[selectedClass][day] = createEmptyTimetable()[day];
      return updated;
    });
  };

  const getBreakStyle = (subject) =>
    ["Break", "Tiffin Break"].includes(subject)
      ? {
          backgroundColor: "#e0f7fa",
          fontWeight: "500",
          fontStyle: "italic",
          color: "#006064",
        }
      : {};

  const renderEditableTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#0288d1" }}>
          <TableRow>
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Day / Time</TableCell>
            {timeSlots.map((slot, idx) => (
              <TableCell key={idx} align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                {slot}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day} hover>
              <TableCell sx={{ fontWeight: 600 }}>{day}</TableCell>
              {timetables[selectedClass][day].map((subject, idx) => (
                <TableCell key={idx} align="center" sx={getBreakStyle(subject)}>
                  {["Break", "Tiffin Break"].includes(subject) ? (
                    <Typography variant="body2">{subject}</Typography>
                  ) : (
                    <FormControl fullWidth size="small">
                      <Select
                        value={subject}
                        onChange={(e) => handleSubjectChange(day, idx, e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {subjects.map((subj) => (
                          <MenuItem key={subj} value={subj}>
                            {subj}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton onClick={() => handleDeleteDay(day)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderStudentTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#1565c0" }}>
          <TableRow>
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Day / Time</TableCell>
            {timeSlots.map((slot, idx) => (
              <TableCell key={idx} align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                {slot}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day} hover>
              <TableCell sx={{ fontWeight: 600 }}>{day}</TableCell>
              {timetables[selectedClass][day].map((subject, idx) => (
                <TableCell key={idx} align="center" sx={getBreakStyle(subject)}>
                  {subject || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        📘 Class Timetable
      </Typography>

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f0f0f0",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          textColor="primary"
          indicatorColor="primary"
          sx={{ fontWeight: "bold" }}
        >
          <Tab label="Student View" />
          <Tab label="Teacher Editable View" />
        </Tabs>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Select Class</InputLabel>
          <Select
            value={selectedClass}
            label="Select Class"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classList.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {tab === 0 ? renderStudentTable() : renderEditableTable()}
    </Container>
  );
};

export default TimeTablePage;
