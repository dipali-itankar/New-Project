import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const initialAssignments = [
  { subject: "Math", title: "Algebra Worksheet", dueDate: "2025-06-25" },
  { subject: "Science", title: "Physics Chapter 3 Notes", dueDate: "2025-06-27" },
];

const AssignmentPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [newAssignment, setNewAssignment] = useState({
    subject: "",
    title: "",
    dueDate: "",
  });

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleAssign = (e) => {
    e.preventDefault();
    if (newAssignment.subject && newAssignment.title && newAssignment.dueDate) {
      setAssignments([...assignments, newAssignment]);
      setNewAssignment({ subject: "", title: "", dueDate: "" });
    }
  };

  const handleDelete = (index) => {
    const updated = [...assignments];
    updated.splice(index, 1);
    setAssignments(updated);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        📝 Assignments
      </Typography>

      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          mb: 3,
          background: "#ffffff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          centered
          sx={{
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Tab label="Student View" sx={{ fontWeight: 600 }} />
          <Tab label="Teacher View" sx={{ fontWeight: 600 }} />
        </Tabs>
      </Paper>

      {/* Student View */}
      {tabIndex === 0 && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            📚 Assigned Work
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Subject</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Assignment</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assign, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{assign.subject}</TableCell>
                    <TableCell>{assign.title}</TableCell>
                    <TableCell>{assign.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Teacher View */}
      {tabIndex === 1 && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ✏️ Assign New Homework
          </Typography>

          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, background: "#f9f9f9" }}>
            <form onSubmit={handleAssign}>
              <Box display="flex" gap={2} flexWrap="wrap">
                <TextField
                  label="Subject"
                  name="subject"
                  value={newAssignment.subject}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Assignment Title"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  type="date"
                  label="Due Date"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ height: "56px", mt: "auto" }}
                >
                  Assign
                </Button>
              </Box>
            </form>
          </Paper>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            📋 Assigned List
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1565c0" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Subject</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Assignment</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Due Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assign, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{assign.subject}</TableCell>
                    <TableCell>{assign.title}</TableCell>
                    <TableCell>{assign.dueDate}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default AssignmentPage;
