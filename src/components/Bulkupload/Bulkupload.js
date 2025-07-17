import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Snackbar,
  Paper,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles((theme) => ({
  ...styles,
  dropZone: {
    border: "2px dashed #ccc",
    padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    color: "#888",
    marginBottom: "20px",
    backgroundColor: "#fafafa",
  },
  input: {
    display: "none",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
    color: "#00acc1",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Bulkupload() {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, severity: "info", message: "" });

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://ec2-43-204-235-24.ap-south-1.compute.amazonaws.com:8686/api/incometax-service/leads/upload-leads-excel",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadResult(res.data);
      setSnackbar({
        open: true,
        severity: "success",
        message: `Upload Successful: ${res.data.saved_records} saved, ${res.data.skipped_duplicates} duplicates.`,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Upload failed. Please try again.",
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      setFile(droppedFile);
      handleFileUpload(droppedFile);
      event.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (event) => {
    const selected = event.target.files[0];
    setFile(selected);
    handleFileUpload(selected);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Bulk Upload Leads</h4>
              <p className={classes.cardCategoryWhite}>
                Upload leads via Excel file (.xlsx or .xls)
              </p>
            </CardHeader>
            <CardBody>
              <Paper
                className={classes.dropZone}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <CloudUploadIcon className={classes.icon} />
                <Typography variant="body1">
                  Drag & drop Excel file here, or click to select
                </Typography>
                <input
                  className={classes.input}
                  id="file-input"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-input">
                  <Button variant="contained" color="primary" component="span" style={{ marginTop: "10px" }}>
                    Choose File
                  </Button>
                </label>
              </Paper>

              {file && (
                <Typography variant="body2">
                  Selected file: <strong>{file.name}</strong>
                </Typography>
              )}

              {uploadResult && (
                <div style={{ marginTop: "20px" }}>
                  <Typography variant="body2">
                    <strong>Status:</strong> {uploadResult.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total Records:</strong> {uploadResult.total_records}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Saved Records:</strong> {uploadResult.saved_records}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Skipped Duplicates:</strong> {uploadResult.skipped_duplicates}
                  </Typography>
                </div>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
