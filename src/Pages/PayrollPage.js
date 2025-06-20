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
  Button,
  Chip,
  Divider,
  Container,
  Stack,
} from "@mui/material";
import { Download, MonetizationOn } from "@mui/icons-material";

const mockPayrollData = [
  {
    month: "June 2025",
    basic: 30000,
    hra: 10000,
    other: 5000,
    total: 45000,
    status: "Paid",
  },
  {
    month: "May 2025",
    basic: 30000,
    hra: 10000,
    other: 5000,
    total: 45000,
    status: "Paid",
  },
  {
    month: "April 2025",
    basic: 30000,
    hra: 10000,
    other: 5000,
    total: 45000,
    status: "Paid",
  },
];

const PayrollPage = () => {
  const [data] = useState(mockPayrollData);

  const handleDownload = (month) => {
    alert(`Salary slip for ${month} downloaded (mock action).`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        💰 Payroll & Salary Slips
      </Typography>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Box mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Monthly Salary Slips
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Basic Pay</TableCell>
                <TableCell align="right">HRA</TableCell>
                <TableCell align="right">Other Allowance</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">₹{row.basic}</TableCell>
                  <TableCell align="right">₹{row.hra}</TableCell>
                  <TableCell align="right">₹{row.other}</TableCell>
                  <TableCell align="right">
                    <strong>₹{row.total}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.status}
                      color={row.status === "Paid" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => handleDownload(row.month)}
                    >
                      Slip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PayrollPage;
