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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {
  fetchAllEmployeesAndManagers,
  sendRequest,
} from "views/Apis/AfterLogin";
import { fetchAllEmployeesoFaManager } from "views/Apis/AfterLogin";

const useStyles = makeStyles(styles);

export default function ManagerEmployeePage() {
  const classes = useStyles();

  const managerId = sessionStorage.getItem("userId");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [managerInfo, setManagerInfo] = useState(null);

  const [employeeList, setEmployeeList] = useState([]);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const getMyEmployees = async () => {
    try {
      const data = await fetchAllEmployeesoFaManager();
      if (Array.isArray(data)) {
        const manager = data.find((user) => user.userType === "manager");
        setManagerInfo(manager);

        const employees = data
          .filter((emp) => emp.userType === "employee")
          .map((emp) => [
            `${emp.firstName} ${emp.lastName}`,
            emp.email,
            emp.mobileNumber,
          ]);
        setEmployeeList(employees);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error.message);
    }
  };

  useEffect(() => {
    getMyEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email format";
    if (!formData.mobileNumber)
      tempErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      tempErrors.mobileNumber = "Invalid mobile number";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      ...formData,
      userType: "employee",
      managerId,
    };

    try {
      const response = await sendRequest({
        method: "POST",
        url: "auth/userEmailPassword",
        data: payload,
      });

      if (response.userStatus) {
        setSnackbar({
          open: true,
          severity: "success",
          message: `${response.status} for new employee!`,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          password: "",
        });
        setOpenModal(false);
        getMyEmployees();
      } else {
        setSnackbar({
          open: true,
          severity: "warning",
          message: response.status || "Failed to add employee",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <div>

         {managerInfo && (
                <Card
                  style={{ marginBottom: "20px", backgroundColor: "#e8f5e9" }}
                >
                  <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Manager Profile</h4>
                  </CardHeader>
                  <CardBody>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <strong>Full Name:</strong>
                        <br />
                        {managerInfo.firstName} {managerInfo.lastName}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <strong>Email:</strong>
                        <br />
                        {managerInfo.email}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <strong>Mobile:</strong>
                        <br />
                        {managerInfo.mobileNumber}
                      </Grid>
                    </Grid>
                  </CardBody>
                </Card>
              )}
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>My Employees</h4>
              <p className={classes.cardCategoryWhite}>
                Manage your assigned employees
              </p>
            </CardHeader>

            <CardBody>


              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 20,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModal(true)}
                >
                  Add Employee
                </Button>
              </div>

              <Table
                tableHeaderColor="info"
                tableHead={["Full Name", "Email", "Mobile"]}
                tableData={employeeList}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                fullWidth
                value={formData.mobileNumber}
                onChange={handleInputChange}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
}
