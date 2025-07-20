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
import Switch from "@material-ui/core/Switch";

import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { fetchAllEmployeesAndManagers } from "views/Apis/AfterLogin";
import { sendRequest } from "views/Apis/AfterLogin";
import { updateLoginStatus } from "views/Apis/AfterLogin";
// import { fetchAllEmployeesAndManagers, sendRequest } from "views/Apis/AfterLogin";

const useStyles = makeStyles(styles);

export default function Addemployees() {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    userType: "admin",
    managerId: "", // For employees only
  });

  const [managers, setManagers] = useState([]);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [adminList, setAdminList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  // Fetch all users
  const getEmployees = async () => {
    try {
      const data = await fetchAllEmployeesAndManagers();
      if (Array.isArray(data)) {
        const admins = [], managers = [], employees = [];
        data.forEach((emp) => {
          const fullName = `${emp.firstName} ${emp.lastName}`;
          const email = emp.email;
          const mobile = emp.mobileNumber;

          const statusToggle = (
    <Switch
      checked={emp.loginStatus}
      onChange={() => handleToggleLoginStatus(emp.id, !emp.loginStatus)}
      color="primary"
    />
  );

          if (emp.userType === "admin") {
            admins.push([fullName, email, mobile]);
          } else if (emp.userType === "manager") {
            managers.push([fullName, email, mobile]);
          } else if (emp.userType === "employee") {
            employees.push([
              fullName,
              emp.managerName || "N/A",
              email,
              mobile,
              statusToggle,
            ]);

          }
        });
        setAdminList(admins);
        setManagerList(managers);
        setEmployeeList(employees);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // If user selects "employee", fetch managers
    if (name === "userType" && value === "employee") {
      try {
        const response = await fetch("http://ec2-43-204-235-24.ap-south-1.compute.amazonaws.com:8686/api/incometax-service/auth/allmanagers");
        const data = await response.json();
        setManagers(data); // save manager list for dropdown
      } catch (error) {
        console.error("Failed to fetch managers:", error.message);
      }
    }

    // Reset managerId if changing userType to anything other than employee
    if (name === "userType" && value !== "employee") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        managerId: "", // reset managerId
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    try {
      // Construct payload
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
        userType: formData.userType,
      };

      if (formData.userType === "employee") {
        payload.managerId = formData.managerId; // only for employees
      }

      const response = await sendRequest({
        method: "POST",
        url: "auth/userEmailPassword",
        data: payload,
      });

      alert(response.status);

      if (response.userStatus) {
        setSnackbar({
          open: true,
          severity: "success",
          message: `${response.status} for ${formData.userType}!`,
        });
      } else {
        setSnackbar({
          open: true,
          severity: "warning",
          message: `Failed to register ${formData.userType}.`,
        });
      }

      // Reset
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
        userType: "admin",
        managerId: "",
      });
      setOpenModal(false);
      await getEmployees();
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message: error.message,
      });
    }
  };



  // Open Modal with userType set
  const handleAddAdmin = (type) => () => {
    setFormData((prev) => ({
      ...prev,
      userType: type.toLowerCase(),
    }));
    setOpenModal(true);
  };

 const handleToggleLoginStatus = async (userId, newStatus) => {
  try {

    const result = await updateLoginStatus(userId, newStatus);


    console.log('Login status updated successfully:', result);


    getEmployees();

  }

  catch (error) {

    console.error('Failed to update login status:', error.message);

    setSnackbar({
      open: true,
      severity: "error",
      message: `Failed to update login status: ${error.message}`,
    });

  }
};

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Employee Management</h4>
              <p className={classes.cardCategoryWhite}>
                Employee, Manager & Admin List
              </p>
            </CardHeader>
            <CardBody>
              {/* Admin Table */}
              <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                <h4>Admins</h4>
                <Button color="primary" variant="contained" onClick={handleAddAdmin("admin")}>
                  Add Admin
                </Button>
              </div>
              <Table
                tableHeaderColor="primary"
                tableHead={["Full Name", "Email", "Mobile"]}
                tableData={adminList}
              />

              {/* Manager Table */}
              <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                <h4>Managers</h4>
                <Button color="secondary" variant="contained" onClick={handleAddAdmin("manager")}>
                  Add Manager
                </Button>
              </div>
              <Table
                tableHeaderColor="warning"
                tableHead={["Full Name", "Email", "Mobile"]}
                tableData={managerList}
              />

              {/* Employee Table */}
              <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                <h4>Employees</h4>
                <Button variant="contained" onClick={handleAddAdmin("employee")}>
                  Add Employee
                </Button>
              </div>
              <Table
                tableHeaderColor="info"
                tableHead={["Full Name", "Manager", "Email", "Mobile","Status"]}
                tableData={employeeList}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Add User Modal */}
      <Dialog
  open={openModal}
  onClose={() => setOpenModal(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>
    {`Add ${formData.userType.charAt(0).toUpperCase() + formData.userType.slice(1)}`}
  </DialogTitle>
  <DialogContent>
    <Grid container spacing={2}>
      {/* First Name */}
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

      {/* Last Name */}
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

      {/* Email */}
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

      {/* Mobile Number */}
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

      {/* Password */}
      <Grid item xs={6}>
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

      {/* User Type Dropdown */}
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>User Type</InputLabel>
          <Select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Manager Dropdown if userType === 'employee' */}
      {formData.userType === "employee" && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Manager</InputLabel>
            <Select
              name="managerId"
              value={formData.managerId}
              onChange={handleInputChange}
            >
              {managers.map((mgr) => (
                <MenuItem key={mgr.id} value={mgr.id}>
                  {mgr.firstName} {mgr.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
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
