import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useTableSearch from "../useTableSearch";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import "date-fns";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Typography } from "@material-ui/core";

const dummyData = [
  {
    eventName: "Theatre Play",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Football Game",
    location: "UCF Stadium",
    adminUsername: "host123",
    website: "knightsfootball.ucf.edu",
    date: new Date(2020, 11, 21),
    startTime: 1500,
    endTime: 1900,
  },
  {
    eventName: "Homeless Event",
    location: "Salvation Army",
    adminUsername: "sal123",
    website: "salvationarmy.org",
    date: new Date(2020, 11, 2),
    startTime: 800,
    endTime: 1100,
  },
  {
    eventName: "Theatre Play 2",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 3",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 4",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 5",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 6",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 7",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 8",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 9",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 10",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
  {
    eventName: "Theatre Play 11",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500,
  },
];

function getFormattedDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getFormattedTime(time) {
  let hr = (time / 100) % 12;
  let min = time % 100;

  if (hr === 0) {
    hr = 12;
  }

  let str = `${hr}:${min}`;

  if (min < 10) {
    str += "0";
  }

  if (time >= 1200) {
    str += "pm";
  } else {
    str += "am";
  }

  return str;
}

const color = 4;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  container: {
    height: 450,
    overflowY: "auto",
  },
  deleteButton: {
    color: "white",
    backgroundColor: "#f44336",
    textTransform: "none",
    margin: theme.spacing(0),
    minWidth: "70px",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
  headerCell: {
    paddingLeft: "16px",
    paddingRight: "16px",
    fontWeight: "bold",
  },
  cell: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  toolbar: {
    dispay: "flex",
    justifyContent: "flex-end",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  searchBar: {
    // flexGrow: 1

    flex: "0 1 40%",
  },
}));

const filterByAny = (currentSearch) => (el) => {
  let lowerCaseSearchText = currentSearch.toLowerCase();

  return (
    el.eventName.toLowerCase().includes(lowerCaseSearchText) ||
    el.location.toLowerCase().includes(lowerCaseSearchText) ||
    el.adminUsername.toLowerCase().includes(lowerCaseSearchText) ||
    el.website.toLowerCase().includes(lowerCaseSearchText)
  );
};

function UserHostedEventsTable() {
  const classes = useStyles();

  const [hostedEvents, setHostedEvents] = useState([]);

  const [emptyRows, setEmptyRows] = useState(0);

  const [
    filteredRows,
    searchText,
    handleSearchTextChange,
    handleOnEnter,
  ] = useTableSearch(hostedEvents, filterByAny, "searchBar");

  useEffect(() => {
    if (filteredRows.length <= 10) {
      setEmptyRows(10 - filteredRows.length);
    } else {
      setEmptyRows(0);
    }
  }, [filteredRows]);

  useEffect(() => {
    setHostedEvents(dummyData);
  }, []);

  const handleDeleteEvent = (name) => {
    let updatedList = [];
    let eventIndex = hostedEvents.findIndex((ev) => ev.eventName === name);

    if (eventIndex !== -1) {
      // api calls

      if (eventIndex === 0) {
        updatedList = updatedList.concat(hostedEvents.slice(1));
      } else {
        updatedList = updatedList.concat(
          hostedEvents.slice(0, eventIndex),
          hostedEvents.slice(eventIndex + 1)
        );
      }

      setHostedEvents(updatedList);
    } else {
      console.log("ERROR: Event not found");
    }
  };

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <TextField
          id="searchBar"
          onKeyPress={handleOnEnter}
          className={classes.searchBar}
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Toolbar>
      <TableContainer
        component={Paper}
        id={"tableContainer"}
        className={classes.container}
      >
        <Table id={"eventsTable"} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ minWidth: 150 }}
                className={classes.headerCell}
              >
                Event Name
              </TableCell>
              <TableCell
                style={{ minWidth: 150 }}
                className={classes.headerCell}
              >
                Location
              </TableCell>
              <TableCell
                style={{ minWidth: 150 }}
                className={classes.headerCell}
              >
                Admin Username
              </TableCell>
              <TableCell
                style={{ minWidth: 160 }}
                className={classes.headerCell}
              >
                Event Website
              </TableCell>
              <TableCell
                style={{ minWidth: 102 }}
                className={classes.headerCell}
              >
                Date
              </TableCell>
              <TableCell
                style={{ minWidth: 108 }}
                align={"center"}
                className={classes.headerCell}
              >
                Start Time
              </TableCell>
              <TableCell
                style={{ minWidth: 102 }}
                align={"center"}
                className={classes.headerCell}
              >
                End Time
              </TableCell>
              <TableCell
                style={{ minWidth: 185 }}
                align={"center"}
                className={classes.headerCell}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((event) => (
              <TableRow key={event.eventName} style={{ height: 50 }}>
                <TableCell className={classes.cell}>
                  {event.eventName}
                </TableCell>
                <TableCell className={classes.cell}>{event.location}</TableCell>
                <TableCell className={classes.cell}>
                  {event.adminUsername}
                </TableCell>
                <TableCell className={classes.cell}>{event.website}</TableCell>
                <TableCell className={classes.cell}>
                  {getFormattedDate(event.date)}
                </TableCell>
                <TableCell align={"center"} className={classes.cell}>
                  {getFormattedTime(event.startTime)}
                </TableCell>
                <TableCell align={"center"} className={classes.cell}>
                  {getFormattedTime(event.endTime)}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.actionsButtonsCell}
                >
                  <div>
                    <Button
                      onClick={() => handleDeleteEvent(event.eventName)}
                      size="small"
                      variant="contained"
                      className={classes.deleteButton}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 45 * emptyRows }}>
                <TableCell align="center" colSpan={8}>
                  {emptyRows === 10 ? "No events found" : ""}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const useStyles2 = makeStyles((theme) => ({
  searchForm: {
    minWidth: "320px",
    minHeight: "240px",
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(10),
  },
  cityField: {
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(6),
  },
}));

export default function UserHostedEventsTab() {
  const classes2 = useStyles2();

  const [didSearch, setDidSearch] = useState(false);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [fromDateErrors, setFromDateErrors] = useState("");
  const [toDateErrors, setToDateErrors] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // api call

    if (fromDateErrors === "" && toDateErrors === "") {
      setDidSearch(true);
    }
  };

  return (
    <div>
      {didSearch ? (
        <UserHostedEventsTable />
      ) : (
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper className={classes2.searchForm}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Grid container spacing={2}>
                  <div className={classes2.cityField}>
                    <TextField id="search-by-city" label="City" />
                  </div>

                  <Grid
                    item
                    container
                    xs={12}
                    justify="center"
                    // alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={5}>
                      <Typography>From:</Typography>
                      <KeyboardDatePicker
                        clearable
                        onError={(error) => setFromDateErrors(error)}
                        value={fromDate}
                        onChange={(date) => {
                          setFromDateErrors("");
                          setFromDate(date);
                        }}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography>To:</Typography>
                      <KeyboardDatePicker
                        onError={(error) => setToDateErrors(error)}
                        value={toDate}
                        minDate={fromDate}
                        onChange={(date) => {
                          setToDateErrors("");
                          setToDate(date);
                        }}
                        format="MM/dd/yyyy"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <div className={classes2.submitButton}>
                  <Button
                    // onClick={handleSubmit}
                    variant={"contained"}
                    color="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </Paper>
          </MuiPickersUtilsProvider>
        </div>
      )}
    </div>
  );
}
