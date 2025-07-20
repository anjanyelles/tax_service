import React, { useEffect, useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@material-ui/core";



import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { fetchLeadsOfEmployee } from "views/Apis/AfterLogin";
import { getAllServices } from "views/Apis/AfterLogin";


const callStatusOptions = [
  'ANSWERED',
  'NOT_ANSWERED',
  'DISCONNECTING',
  'NOT_REACHABLE',
  'OUT_OF_NETWORK',
  'WRONG_NUMBER',
];

const leadStatusOptions = [
  'INTERESTED',
  'NOT_INTERESTED',
  // 'COLD',
  // 'HOT',
  'FOLLOW_UP_NEEDED',
  // 'CONVERTED',
  // 'LOST',
  // 'NOT_IN_PURVIEW',
];

const useStyles = makeStyles((theme) => ({
  ...styles,
  tableHeadCell: {
    fontWeight: "bold",
    backgroundColor: "#e3f2fd",
    color: "#0d47a1",
  },
  statusBadge: {
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: "#f1f8e9",
    color: "#558b2f",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "center",
    display: "inline-block",
    minWidth: 60,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
    alignItems: "center",
  },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
}));

export default function GetLeadsEmployeeView() {
  const classes = useStyles();
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const employeeId = sessionStorage.getItem("userId");

    const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');



  const [callStatus, setCallStatus] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [comment, setComment] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');


const onSubmit = () => {
    if (!callStatus) return alert('Please select call status');
    if (callStatus === 'ANSWERED' && !leadStatus) return alert('Please select lead status');

    const payload = {
      leadId: selectedLeadId,
      userId: employeeId,
      callStatus,
      comment,
      leadStatus: callStatus === 'ANSWERED' ? leadStatus : null,
      selectedService: leadStatus === 'INTERESTED' ? selectedService : null,
      followUpDate: leadStatus === 'FOLLOW_UP_NEEDED' ? followUpDate : null,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('✅ Payload:', payload);
    handleCloseDialog();
    setCallStatus('');
    setLeadStatus('');
    setSelectedService('');
    setFollowUpDate('');
    setComment('');
  };

  useEffect(() => {

    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
        console.log("Fetched services:", data);
      } catch (error) {
        console.error('Failed to fetch services:', error.message);
      }
    };
    fetchServices();
  }, []);


  const fetchLeads = async () => {
    try {
      const res = await fetchLeadsOfEmployee(employeeId, page, size);
      if (res?.leads) {
        setLeads(res.leads);
        setTotalPages(res.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch employee leads:", err.message);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchLeads();
    }
  }, [page, size]);

  const handleOpenDialog = (leadId) => {
    setSelectedLeadId(leadId);
    setOpenDialog(true);
    console.log("Lead ID clicked:", leadId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLeadId(null);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary">
              <div className={classes.topHeader}>
                <div>
                  <h4 className={classes.cardTitleWhite}>My Leads</h4>
                  <p className={classes.cardCategoryWhite}>
                    Page {page + 1} of {totalPages}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <Button
                    color="white"
                    size="sm"
                    disabled={page <= 0}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  >
                    ⬅ Previous
                  </Button>
                  <Button
                    color="white"
                    size="sm"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next ➡
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <GridContainer spacing={3} style={{ marginBottom: "20px" }}>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Page Size</InputLabel>
                    <Select
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                        setPage(0);
                      }}
                      label="Page Size"
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>

              <div style={{ overflowX: "auto" }}>
                <MuiTable>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeadCell}>
                        Name
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Email
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Phone
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Address
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Source
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Lead Status
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Created At
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          No leads found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>{lead.name || "-"}</TableCell>
                          <TableCell>{lead.email || "-"}</TableCell>
                          <TableCell>{lead.phoneNumber || "-"}</TableCell>
                          <TableCell>{lead.address || "-"}</TableCell>
                          <TableCell>{lead.source || "-"}</TableCell>
                          <TableCell>
                            <span className={classes.statusBadge}>
                              {lead.leadStatus || "N/A"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="info"
                              size="sm"
                              onClick={() => handleOpenDialog(lead.id)}
                            >
                              Call & Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </MuiTable>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Call Status</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You clicked on lead ID: <strong>{selectedLeadId}</strong>
          </Typography>

          <TextField
            select
            label="Call Status"
            value={callStatus}
            onChange={(e) => {
              setCallStatus(e.target.value);
              if (e.target.value !== 'ANSWERED') setLeadStatus('');
            }}
            fullWidth
            margin="normal"
          >
            {callStatusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status.replaceAll('_', ' ')}
              </MenuItem>
            ))}
          </TextField>

          {callStatus === 'ANSWERED' && (
            <TextField
              select
              label="Lead Status"
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
              fullWidth
              margin="normal"
            >
              {leadStatusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.replaceAll('_', ' ')}
                </MenuItem>
              ))}
            </TextField>
          )}

          {leadStatus === 'FOLLOW_UP_NEEDED' && (
            <TextField
              label="Follow Up Date"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}

          {leadStatus === 'INTERESTED' && (
            <TextField
              select
              label="Select Service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              fullWidth
              margin="normal"
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.serviceName}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">Cancel</Button>
          <Button onClick={onSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
