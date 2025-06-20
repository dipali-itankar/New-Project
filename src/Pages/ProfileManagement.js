import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

const departments = ["Mathematics", "Science", "English", "History", "Computer Science"];
const designations = ["Lecturer", "Assistant Professor", "Associate Professor", "Professor"];
const qualifications = ["B.Ed", "M.Ed", "Ph.D", "M.Sc", "MA", "MCA"];

const ProfileManagement = () => {
  return (
    <Box sx={{ p: 3, background: "#f0f2f5", minHeight: "100vh" }}>
      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 4,
          boxShadow: 4,
          px: { xs: 2, md: 5 },
          py: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent>
          {/* Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "#0d47a1",
              mb: 2,
              textAlign: "center",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            👤 Profile Management
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Keep your profile up-to-date with accurate personal and professional details.
          </Typography>

          {/* Personal Details */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}>
            Personal Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" variant="outlined" type="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone Number" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Gender" defaultValue="">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Address" variant="outlined" />
            </Grid>
          </Grid>

          {/* Professional Details */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 5, mb: 1, color: "#1976d2" }}>
            💼 Professional Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Department"
                variant="outlined"
                defaultValue=""
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Designation"
                variant="outlined"
                defaultValue=""
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              >
                {designations.map((desig) => (
                  <MenuItem key={desig} value={desig}>
                    {desig}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Highest Qualification"
                variant="outlined"
                defaultValue=""
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              >
                {qualifications.map((qual) => (
                  <MenuItem key={qual} value={qual}>
                    {qual}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                variant="outlined"
                inputProps={{ min: 0 }}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              />
            </Grid>
          </Grid>

          {/* Save Button */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#125ea8" },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileManagement;
