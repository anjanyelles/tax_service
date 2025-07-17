
// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Checkbox,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table as MuiTable,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";

// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// import {
//   fetchAllEmployeesoFaManager,
//   assignLeadsToEmployee,
//   fetchLeadsForManager,
// } from "views/Apis/AfterLogin";

// const useStyles = makeStyles(styles);

// export default function GetLeadsManagerView() {
//   const classes = useStyles();
//   const managerId = sessionStorage.getItem("userId");

//   const [leads, setLeads] = useState([]);
//   const [selectedLeads, setSelectedLeads] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);

//   const [filterType, setFilterType] = useState(""); // "assigned", "unassigned", "employee"
//   const [selectedUserId, setSelectedUserId] = useState("");

//   const fetchLeads = async () => {
//     try {
//       let assignedOnly = false;
//       let unassignedOnly = false;
//       let userId = "";

//       if (filterType === "assigned") assignedOnly = true;
//       else if (filterType === "unassigned") unassignedOnly = true;
//       else if (filterType === "employee") userId = selectedUserId;

//       const res = await fetchLeadsForManager({
//         page,
//         size,
//         managerId,
//         assignedOnly,
//         unassignedOnly,
//         userId,
//       });

//       if (res?.leads) {
//         setLeads(res.leads);
//         setTotalPages(res.totalPages);
//       }
//     } catch (error) {
//       console.error("Error fetching leads:", error.message);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const allUsers = await fetchAllEmployeesoFaManager();
//       const filteredEmployees = allUsers.filter(
//         (u) => u.userType === "employee" && u.managerId === managerId
//       );
//       setEmployees(filteredEmployees);
//     } catch (error) {
//       console.error("Failed to fetch employees:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//     fetchEmployees();
//   }, [page, size]);

//   useEffect(() => {
//     fetchLeads();
//   }, [page, size, filterType, selectedUserId]);

//   const handleAssignLeads = async () => {
//     if (!selectedLeads.length || !selectedEmployeeId) {
//       alert("Please select leads and an employee.");
//       return;
//     }

//     try {
//       const res = await assignLeadsToEmployee({
//         leadIds: selectedLeads,
//         employeeId: selectedEmployeeId,
//       });

//       if (res.status) {
//         alert(`${res.message} (${res.assignedLeadCount} leads assigned)`);
//         setSelectedLeads([]);
//         setSelectedEmployeeId("");
//         setOpenDialog(false);
//         fetchLeads();
//       } else {
//         alert(res.message || "Failed to assign leads.");
//       }
//     } catch (error) {
//       console.error("Assignment failed:", error.message);
//     }
//   };

//   return (
//     <div>
//       {selectedLeads.length > 0 && (
//         <div style={{ textAlign: "right", marginBottom: "10px" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenDialog(true)}
//           >
//             Assign Selected Leads To Employee
//           </Button>
//         </div>
//       )}

//       <GridContainer>
//         <GridItem xs={12}>
//           <Card>
//             <CardBody>
//               <GridContainer spacing={3}>
//                 <GridItem xs={12} sm={6} md={3}>
//                   <FormControl fullWidth>
//                     <InputLabel>Filter by Employee</InputLabel>
//                     <Select
//                       value={filterType === "employee" ? selectedUserId : ""}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value === "") {
//                           setFilterType("");
//                           setSelectedUserId("");
//                         } else {
//                           setFilterType("employee");
//                           setSelectedUserId(value);
//                         }
//                         setPage(0);
//                       }}
//                     >
//                       <MenuItem value="">All Employees</MenuItem>
//                       {employees.map((emp) => (
//                         <MenuItem key={emp.id} value={emp.id}>
//                           {emp.firstName} {emp.lastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </GridItem>

//                 <GridItem xs={12} sm={6} md={3}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={filterType === "assigned"}
//                         onChange={() => {
//                           setFilterType(filterType === "assigned" ? "" : "assigned");
//                           setSelectedUserId("");
//                           setPage(0);
//                         }}
//                       />
//                     }
//                     label="Assigned Only"
//                   />
//                 </GridItem>

//                 <GridItem xs={12} sm={6} md={3}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={filterType === "unassigned"}
//                         onChange={() => {
//                           setFilterType(filterType === "unassigned" ? "" : "unassigned");
//                           setSelectedUserId("");
//                           setPage(0);
//                         }}
//                       />
//                     }
//                     label="Unassigned Only"
//                   />
//                 </GridItem>

//                 <GridItem xs={12} sm={6} md={3}>
//                   <FormControl fullWidth>
//                     <InputLabel>Page Size</InputLabel>
//                     <Select
//                       value={size}
//                       onChange={(e) => {
//                         setSize(e.target.value);
//                         setPage(0);
//                       }}
//                     >
//                       <MenuItem value={20}>20</MenuItem>
//                       <MenuItem value={50}>50</MenuItem>
//                       <MenuItem value={100}>100</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </GridItem>
//               </GridContainer>
//             </CardBody>
//           </Card>

//           <Card>
//             <CardHeader color="info">
//               <h4 className={classes.cardTitleWhite}>My Assigned Leads</h4>
//               <p className={classes.cardCategoryWhite}>
//                 Page {page + 1} of {totalPages}
//               </p>
//             </CardHeader>
//             <CardBody>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
//                   Previous
//                 </Button>
//                 <Button
//                   disabled={page >= totalPages - 1}
//                   onClick={() => setPage(page + 1)}
//                 >
//                   Next
//                 </Button>
//               </div>

//               <div style={{ overflowX: "auto" }}>
//                 <MuiTable>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={
//                             selectedLeads.length > 0 &&
//                             selectedLeads.length === leads.length
//                           }
//                           indeterminate={
//                             selectedLeads.length > 0 &&
//                             selectedLeads.length < leads.length
//                           }
//                           onChange={(e) => {
//                             if (e.target.checked) {
//                               setSelectedLeads(leads.map((l) => l.id));
//                             } else {
//                               setSelectedLeads([]);
//                             }
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Phone</TableCell>
//                       <TableCell>Address</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Source</TableCell>
//                       <TableCell>Created At</TableCell>
//                       <TableCell>Assigned To</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {leads.map((lead) => {
//                       const isChecked = selectedLeads.includes(lead.id);
//                       return (
//                         <TableRow key={lead.id}>
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               checked={isChecked}
//                               onChange={() => {
//                                 if (isChecked) {
//                                   setSelectedLeads(
//                                     selectedLeads.filter((id) => id !== lead.id)
//                                   );
//                                 } else {
//                                   setSelectedLeads([...selectedLeads, lead.id]);
//                                 }
//                               }}
//                             />
//                           </TableCell>
//                           <TableCell>{lead.name}</TableCell>
//                           <TableCell>{lead.email}</TableCell>
//                           <TableCell>{lead.phoneNumber}</TableCell>
//                           <TableCell>{lead.address}</TableCell>
//                           <TableCell>{lead.leadStatus}</TableCell>
//                           <TableCell>{lead.source}</TableCell>
//                           <TableCell>
//                             {new Date(lead.createdAt).toLocaleDateString()}
//                           </TableCell>
//                           <TableCell>{lead.userName || "-"}</TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </MuiTable>
//               </div>
//             </CardBody>
//           </Card>
//         </GridItem>
//       </GridContainer>

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Assign Leads to Employee</DialogTitle>
//         <DialogContent>
//           <p>You have selected {selectedLeads.length} leads.</p>
//           <FormControl fullWidth>
//             <InputLabel>Select Employee</InputLabel>
//             <Select
//               value={selectedEmployeeId}
//               onChange={(e) => setSelectedEmployeeId(e.target.value)}
//             >
//               {employees.map((emp) => (
//                 <MenuItem key={emp.id} value={emp.id}>
//                   {emp.firstName} {emp.lastName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleAssignLeads}
//             color="primary"
//             disabled={!selectedEmployeeId}
//           >
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {
  fetchAllEmployeesoFaManager,
  assignLeadsToEmployee,
  fetchLeadsForManager,
} from "views/Apis/AfterLogin";

const useStyles = makeStyles(styles);

export default function GetLeadsManagerView() {
  const classes = useStyles();
  const managerId = sessionStorage.getItem("userId");

  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [filterType, setFilterType] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const fetchLeads = async () => {
    try {
      let assignedOnly = false;
      let unassignedOnly = false;
      let userId = "";

      if (filterType === "assigned") assignedOnly = true;
      else if (filterType === "unassigned") unassignedOnly = true;
      else if (filterType === "employee") userId = selectedUserId;

      const res = await fetchLeadsForManager({
        page,
        size,
        managerId,
        assignedOnly,
        unassignedOnly,
        userId,
      });

      if (res?.leads) {
        setLeads(res.leads);
        setTotalPages(res.totalPages);
      }
    } catch (error) {
      console.error("Error fetching leads:", error.message);
    }
  };

  const fetchEmployees = async () => {
    try {
      const allUsers = await fetchAllEmployeesoFaManager();
      const filteredEmployees = allUsers.filter(
        (u) => u.userType === "employee" && u.managerId === managerId
      );
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error("Failed to fetch employees:", error.message);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchEmployees();
  }, [page, size]);

  useEffect(() => {
    fetchLeads();
  }, [page, size, filterType, selectedUserId]);

  const handleAssignLeads = async () => {
    if (!selectedLeads.length || !selectedEmployeeId) {
      alert("Please select leads and an employee.");
      return;
    }

    try {
      const res = await assignLeadsToEmployee({
        leadIds: selectedLeads,
        employeeId: selectedEmployeeId,
      });

      if (res.status) {
        alert(`${res.message} (${res.assignedLeadCount} leads assigned)`);
        setSelectedLeads([]);
        setSelectedEmployeeId("");
        setOpenDialog(false);
        fetchLeads();
      } else {
        alert(res.message || "Failed to assign leads.");
      }
    } catch (error) {
      console.error("Assignment failed:", error.message);
    }
  };

  return (
    <div>
      {selectedLeads.length > 0 && (
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Assign Selected Leads To Employee
          </Button>
        </div>
      )}

      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardBody>
              <GridContainer spacing={3}>
                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Filter by Employee</InputLabel>
                    <Select
                      value={filterType === "employee" ? selectedUserId : ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setFilterType("");
                          setSelectedUserId("");
                        } else {
                          setFilterType("employee");
                          setSelectedUserId(value);
                        }
                        setPage(0);
                      }}
                    >
                      <MenuItem value="">All Employees</MenuItem>
                      {employees.map((emp) => (
                        <MenuItem key={emp.id} value={emp.id}>
                          {emp.firstName} {emp.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterType === "assigned"}
                        onChange={() => {
                          setFilterType(filterType === "assigned" ? "" : "assigned");
                          setSelectedUserId("");
                          setPage(0);
                        }}
                      />
                    }
                    label="Assigned Only"
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterType === "unassigned"}
                        onChange={() => {
                          setFilterType(filterType === "unassigned" ? "" : "unassigned");
                          setSelectedUserId("");
                          setPage(0);
                        }}
                      />
                    }
                    label="Unassigned Only"
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Page Size</InputLabel>
                    <Select
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                        setPage(0);
                      }}
                    >
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>

          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>My Assigned Leads</h4>
              <p className={classes.cardCategoryWhite}>
                Page {page + 1} of {totalPages}
              </p>
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <Button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <MuiTable>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedLeads.length > 0 &&
                            selectedLeads.length ===
                              leads.filter((l) => l.userId === null).length
                          }
                          indeterminate={
                            selectedLeads.length > 0 &&
                            selectedLeads.length <
                              leads.filter((l) => l.userId === null).length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLeads(
                                leads.filter((l) => l.userId === null).map((l) => l.id)
                              );
                            } else {
                              setSelectedLeads([]);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Assigned To</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leads.map((lead) => {
                      const isChecked = selectedLeads.includes(lead.id);
                      return (
                        <TableRow key={lead.id}>
                          <TableCell padding="checkbox">
                            {lead.userId === null ? (
                              <Checkbox
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setSelectedLeads(
                                      selectedLeads.filter((id) => id !== lead.id)
                                    );
                                  } else {
                                    setSelectedLeads([...selectedLeads, lead.id]);
                                  }
                                }}
                              />
                            ) : null}
                          </TableCell>
                          <TableCell>{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phoneNumber}</TableCell>
                          <TableCell>{lead.address}</TableCell>
                          <TableCell>{lead.leadStatus}</TableCell>
                          <TableCell>{lead.source}</TableCell>
                          <TableCell>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </TableCell>
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Assign Leads to Employee</DialogTitle>
        <DialogContent>
          <p>You have selected {selectedLeads.length} leads.</p>
          <FormControl fullWidth>
            <InputLabel>Select Employee</InputLabel>
            <Select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
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
            onClick={handleAssignLeads}
            color="primary"
            disabled={!selectedEmployeeId}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
