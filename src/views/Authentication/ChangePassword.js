import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { fetchAllEmplyeeDetails } from "views/Apis/AfterLogin";
import { updatePassword } from "views/Apis/AfterLogin";

const useStyles = makeStyles(styles);

export default function ChangePassword() {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  // Fetch all employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchAllEmplyeeDetails();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      setSnackbar({
        open: true,
        severity: "error",
        message: `Failed to fetch employees: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployeeId(event.target.value);
    setNewPassword(""); // Reset password field when employee changes
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async () => {
  if (!selectedEmployeeId) {
    setSnackbar({
      open: true,
      severity: "warning",
      message: "Please select an employee",
    });
    return;
  }

  if (!newPassword) {
    setSnackbar({
      open: true,
      severity: "warning",
      message: "Please enter a new password",
    });
    return;
  }

  try {
    setLoading(true);



    const response = await updatePassword(selectedEmployeeId, newPassword);
   


    if (response.success) {
      setSnackbar({
        open: true,
        severity: "success",
        message: response.message || "Password changed successfully",
      });


      setSelectedEmployeeId("");
      setNewPassword("");
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: response.message || "Failed to change password",
      });
    }
  }

  catch (error) {
    console.error("Error changing password:", error);
    setSnackbar({
      open: true,
      severity: "error",
      message: `Error changing password: ${error.message}`,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={6} lg={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change Password</h4>
              <p className={classes.cardCategoryWhite}>
                Select employee and update password
              </p>
            </CardHeader>
            <CardBody>
              <Grid container spacing={3}>
                {/* Employee Selection Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Employee</InputLabel>
                    <Select
                      value={selectedEmployeeId}
                      onChange={handleEmployeeChange}
                      disabled={loading}
                    >
                      {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.firstName} {employee.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Password Field - Only show when employee is selected */}
                {selectedEmployeeId && (
                  <Grid item xs={12}>
                    <TextField
                      label="New Password"
                      type="password"
                      fullWidth
                      value={newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </Grid>
                )}

                {/* Submit Button - Only show when employee is selected */}
                {selectedEmployeeId && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={!newPassword}
                      fullWidth
                    >
                      Change Password
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
}