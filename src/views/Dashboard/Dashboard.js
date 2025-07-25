import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
    <GridContainer>
  <GridItem xs={12} sm={6} md={3}>
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="warning">
          <Icon>content_copy</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>New Leads</p>
        <h3 className={classes.cardTitle}>48</h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <Danger>
            <Warning />
          </Danger>
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            View Details
          </a>
        </div>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={3}>
    <Card>
      <CardHeader color="success" stats icon>
        <CardIcon color="success">
          <Store />
        </CardIcon>
        <p className={classes.cardCategory}>Converted Clients</p>
        <h3 className={classes.cardTitle}>32</h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <DateRange />
          This Month
        </div>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={3}>
    <Card>
      <CardHeader color="danger" stats icon>
        <CardIcon color="danger">
          <Icon>info_outline</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>Pending Services</p>
        <h3 className={classes.cardTitle}>15</h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <LocalOffer />
          In Progress
        </div>
      </CardFooter>
    </Card>
  </GridItem>

  <GridItem xs={12} sm={6} md={3}>
    <Card>
      <CardHeader color="info" stats icon>
        <CardIcon color="info">
          <Accessibility />
        </CardIcon>
        <p className={classes.cardCategory}>Outstanding Amount</p>
        <h3 className={classes.cardTitle}>₹1.2L</h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <Update />
          Last Updated Today
        </div>
      </CardFooter>
    </Card>
  </GridItem>
</GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
  <Card>
    <CardHeader color="warning">
      <h4 className={classes.cardTitleWhite}>Lead Details</h4>
      <p className={classes.cardCategoryWhite}>
        All leads updated as of 15th May, 2025
      </p>
    </CardHeader>
    <CardBody>
      <Table
        tableHeaderColor="warning"
        tableHead={["Lead Name", "Contact", "Service", "Source", "Assigned To", "Status", "Created"]}
        tableData={[
          ["Rohit Sharma", "9876543210", "Income Tax Filing", "Website", "Caller 1", "New", "15/05/2025"],
          ["Priya Patel", "8765432109", "GST Filing", "Referral", "Caller 2", "Contacted", "12/05/2025"],
          ["Aditya Singh", "7654321098", "TDS Return", "Walk-in", "Caller 3", "Follow-up", "10/05/2025"],
          ["Neha Gupta", "6543210987", "PF/ESI", "Website", "Caller 4", "Converted", "08/05/2025"],
          ["Vikram Malhotra", "5432109876", "Income Tax Filing", "Referral", "Caller 1", "Dropped", "05/05/2025"],
        ]}
      />
    </CardBody>
  </Card>
</GridItem>

      </GridContainer>
    </div>
  );
}
