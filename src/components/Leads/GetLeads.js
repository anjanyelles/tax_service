import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

// Material Dashboard components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { fetchLeadsForAdmin } from "views/Apis/AfterLogin";
import { getAllManagers } from "views/Apis/AfterLogin";
import { assignLeadsToManager } from "views/Apis/AfterLogin";

const useStyles = makeStyles(styles);

export default function GetLeads() {
  const classes = useStyles();

  const [selectedLeads, setSelectedLeads] = useState([]);

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [unassignedOnly, setUnassignedOnly] = useState(false);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [managers, setManagers] = useState([]);
  const [managerId, setManagerId] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState("");

  const fetchLeads = () => {
    fetchLeadsForAdmin({ page, size, unassigned: unassignedOnly, managerId })
      .then((res) => {
        if (res?.leads) {
          setLeads(res.leads);
          setTotalPages(res.totalPages);
        }
      })
      .catch((err) => console.error("Error fetching leads:", err.message));
  };

  const fetchManagers = async () => {
    try {
      const managers = await getAllManagers();
      setManagers(managers);
    } catch (error) {
      console.error("Failed to fetch managers:", error.message);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchManagers();
  }, [page, size, unassignedOnly, managerId]);

  const filteredLeads = leads.filter((lead) => {
    const val = search.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(val) ||
      lead.email?.toLowerCase().includes(val) ||
      lead.phoneNumber?.includes(val)
    );
  });

  const tableHead = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "Source",
    "Lead Status",
    "Created At",
    "Manager Name",
    "Employee Name",
  ];

  const tableData = filteredLeads.map((lead) => [
    lead.name || "-",
    lead.email || "-",
    lead.phoneNumber || "-",
    lead.address || "-",
    lead.source || "-",
    lead.leadStatus || "-",
    new Date(lead.createdAt).toLocaleDateString(),
    lead.managerName || "-",
    lead.userName || "-",
  ]);



const handleAssignLeadsToManager = async () => {
  if (selectedLeads.length === 0 || !selectedManagerId) {
    alert("Please select at least one lead and a manager.");
    return;
  }

  console.log("Assigning leads:", selectedLeads, "to manager:", selectedManagerId);
  const payload = {
    leadIds: selectedLeads,
    managerId: selectedManagerId,
  };

  try {
    const response = await assignLeadsToManager(payload);

    console.log("Assignment response:", response);

    if (response.status) {
      alert(`${response.message} (${response.assignedLeadCount} leads assigned)`);
      setOpenDialog(false);
      setSelectedLeads([]);
      setSelectedManagerId("");
      fetchLeads();
    } else {
      alert(`Failed: ${response.message}`);
    }
  } catch (error) {
    console.error("Assignment failed:", error);
    alert("Something went wrong. Please try again.");
  }
};



  return (
    <div>
       {selectedLeads.length > 0 && (
        <div style={{ marginBottom: "16px", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Assign to Manager
          </Button>
        </div>
      )}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* Filters */}
          <Card>
            <CardBody>
              <GridContainer spacing={3}>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Filter by Manager</InputLabel>
                    <Select
                      value={managerId}
                      onChange={(e) => {
                        setManagerId(e.target.value);
                        setPage(0); // Reset to first page
                      }}
                    >
                      <MenuItem value="">All Managers</MenuItem>
                      {managers.map((manager) => (
                        <MenuItem key={manager.id} value={manager.id}>
                          {manager.firstName} {manager.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={unassignedOnly}
                        onChange={() => setUnassignedOnly(!unassignedOnly)}
                      />
                    }
                    label="Unassigned Only"
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Assigned User</InputLabel>
                    <Select
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    >
                      <MenuItem value="">All Users</MenuItem>
                      <MenuItem value="09611ac6-0a7e-4c86-bdbb-57c81561a85c">
                        User 1
                      </MenuItem>
                      {/* Add more users dynamically if needed */}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Page Size</InputLabel>
                    <Select
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                        setPage(0); // reset to first page
                      }}
                    >
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={200}>200</MenuItem>
                      <MenuItem value={500}>500</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Leads List</h4>
              <p className={classes.cardCategoryWhite}>
                Page {page + 1} of {totalPages}
              </p>
            </CardHeader>
            <CardBody>

               <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Button
                  disabled={page <= 0}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                >
                  Previous
                </Button>
                <Button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <MuiTable>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        padding="checkbox"
                        style={{ textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            indeterminate={
                              selectedLeads.length > 0 &&
                              selectedLeads.length <
                                filteredLeads.filter(
                                  (lead) => !lead.managerId && !lead.managerName
                                ).length
                            }
                            checked={
                              filteredLeads.length > 0 &&
                              selectedLeads.length ===
                                filteredLeads.filter(
                                  (lead) => !lead.managerId && !lead.managerName
                                ).length
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                const ids = filteredLeads
                                  .filter(
                                    (lead) =>
                                      !lead.managerId && !lead.managerName
                                  )
                                  .map((lead) => lead.id);
                                setSelectedLeads(ids);
                              } else {
                                setSelectedLeads([]);
                              }
                            }}
                          />
                          <span style={{ fontSize: "12px", marginTop: "-6px" }}>
                            Select All
                          </span>
                        </div>
                      </TableCell>
                      {tableHead.map((head, idx) => (
                        <TableCell key={idx}>{head}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredLeads.map((lead) => {
                      const isSelectable = !lead.managerId && !lead.managerName;
                      const isChecked = selectedLeads.includes(lead.id);

                      return (
                        <TableRow key={lead.id}>
                          <TableCell padding="checkbox">
                            {isSelectable ? (
                              <Checkbox
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setSelectedLeads(
                                      selectedLeads.filter(
                                        (id) => id !== lead.id
                                      )
                                    );
                                  } else {
                                    setSelectedLeads([
                                      ...selectedLeads,
                                      lead.id,
                                    ]);
                                  }
                                }}
                              />
                            ) : null}
                          </TableCell>
                          <TableCell>{lead.name || "-"}</TableCell>
                          <TableCell>{lead.email || "-"}</TableCell>
                          <TableCell>{lead.phoneNumber || "-"}</TableCell>
                          <TableCell>{lead.address || "-"}</TableCell>
                          <TableCell>{lead.source || "-"}</TableCell>
                          <TableCell>{lead.leadStatus || "-"}</TableCell>
                          <TableCell>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{lead.managerName || "-"}</TableCell>
                          <TableCell>{lead.userName || "-"}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </MuiTable>
              </div>


            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Selected Leads</DialogTitle>
        <DialogContent>
          <p>
            You have selected <strong>{selectedLeads.length}</strong> lead(s).
          </p>
          <FormControl fullWidth>
            <InputLabel>Select Manager</InputLabel>
            <Select
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
            >
              {managers.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.firstName} {manager.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button

            onClick={handleAssignLeadsToManager}


            color="primary"
            disabled={!selectedManagerId}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
