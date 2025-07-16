import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { makeStyles } from "@material-ui/core/styles";
import {
  Person,
  Email,
  Phone,
  Business,
} from "@material-ui/icons";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { fetchEmplyeeDetails } from "views/Apis/AfterLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
  },
  headerSection: {
    textAlign: "center",
    padding: theme.spacing(3),
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  infoCard: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    width: "100%",
    minHeight: "150px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[6],
    },
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: "50%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    fontSize: "2rem",
    color: "#3f51b5",
  },
  label: {
    fontWeight: 500,
    color: "#666",
    marginTop: theme.spacing(1),
  },
  value: {
    fontSize: "1rem",
    color: "#222",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
    maxWidth: "100%",
  },
  chip: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
  errorContainer: {
    margin: theme.spacing(2),
  },
}));

export default function EmployeeProfile() {
  const classes = useStyles();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = sessionStorage.getItem("userId");

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!employeeId) throw new Error("Employee ID not found in session storage");

      const response = await fetchEmplyeeDetails(employeeId);

      if (response && response.length > 0) {
        setEmployee(response[0]);
      } else {
        throw new Error("No employee data found");
      }
    } catch (err) {
      console.error("Error fetching employee details:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const getInitials = (firstName, lastName) =>
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className={classes.errorContainer}>
        <Alert severity="warning" variant="filled">
          No employee data available
        </Alert>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <GridContainer>
        <GridItem xs={12}>
          <Paper className={classes.headerSection}>
            <Avatar className={classes.avatar}>
              {getInitials(employee.firstName, employee.lastName)}
            </Avatar>
            <Typography variant="h4" gutterBottom>
              {employee.firstName} {employee.lastName}
            </Typography>
            <Chip
              label={employee.userType?.toUpperCase()}
              className={classes.chip}
              icon={<EmojiEventsIcon />}
            />
          </Paper>
        </GridItem>

        {/* Info Cards */}
        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes.infoCard}>
            <div className={classes.iconContainer}>
              <Person className={classes.icon} />
            </div>
            <Typography className={classes.label}>EMPLOYEE ID</Typography>
            <Typography className={classes.value}>
              {employee.id?.slice(0, 8)}...
            </Typography>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes.infoCard}>
            <div className={classes.iconContainer}>
              <Email className={classes.icon} />
            </div>
            <Typography className={classes.label}>EMAIL</Typography>
            <Typography className={classes.value}>
              <span style={{ userSelect: "text" }}>{employee.email}</span>
            </Typography>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes.infoCard}>
            <div className={classes.iconContainer}>
              <Phone className={classes.icon} />
            </div>
            <Typography className={classes.label}>PHONE</Typography>
            <Typography className={classes.value}>
              {employee.mobileNumber}
            </Typography>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes.infoCard}>
            <div className={classes.iconContainer}>
              <Business className={classes.icon} />
            </div>
            <Typography className={classes.label}>MANAGER</Typography>
            <Typography className={classes.value}>
              {employee.managerName || "Not Assigned"}
            </Typography>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes.infoCard}>
            <div className={classes.iconContainer}>
              <EmojiEventsIcon className={classes.icon} />
            </div>
            <Typography className={classes.label}>USER TYPE</Typography>
            <Typography className={classes.value}>
              {employee.userType?.toUpperCase()}
            </Typography>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes.infoCard}>
            <div className={classes.iconContainer}>
              <Person className={classes.icon} />
            </div>
            <Typography className={classes.label}>MANAGER ID</Typography>
            <Typography className={classes.value}>
              {employee.managerId?.slice(0, 8)}...
            </Typography>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
