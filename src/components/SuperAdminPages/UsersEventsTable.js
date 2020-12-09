import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import useTableSearch from "../useTableSearch";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",

    // justifyContent: "center",
    marginLeft: theme.spacing(35),
    marginTop: theme.spacing(5),
  },
  container: {
    height: 450,
    overflowY: "auto",
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
    flex: "0 1 40%",
  },
}));

const filterByAny = (currentSearch) => (el) => {
  let lowerCaseSearchText = currentSearch.toLowerCase();

  return (
    el.eventName.toLowerCase().includes(lowerCaseSearchText) ||
    el.eventLocation.toLowerCase().includes(lowerCaseSearchText)
  );
};

export default function LocationsTable({ userEventsData, username }) {
  const classes = useStyles();

  const [emptyRows, setEmptyRows] = useState(0);

  const [
    filteredRows,
    searchText,
    handleSearchTextChange,
    handleOnEnter,
  ] = useTableSearch(userEventsData, filterByAny, "locationsSearchBar");

  useEffect(() => {
    if (filteredRows.length <= 10) {
      setEmptyRows(10 - filteredRows.length);
    } else {
      setEmptyRows(0);
    }
  }, [filteredRows]);

  return (
    <>
      <Toolbar />
      <Toolbar />

      <div className={classes.root}>
        <Typography variant="h6">
          Showing Events for User: <strong>{username}</strong>
        </Typography>
        <Toolbar className={classes.toolbar}>
          <TextField
            id="userEventsSearchBar"
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
          <Table id={"userEventsTable"} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ minWidth: 150 }}
                  className={classes.headerCell}
                >
                  Event name
                </TableCell>
                <TableCell
                  style={{ minWidth: 200 }}
                  className={classes.headerCell}
                >
                  Location
                </TableCell>
                <TableCell
                  style={{ minWidth: 200 }}
                  className={classes.headerCell}
                >
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((ev) => (
                <TableRow key={ev.eventId}>
                  <TableCell>{ev.eventName}</TableCell>
                  <TableCell>{ev.eventLocation}</TableCell>
                  <TableCell>{ev.role}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 45 * emptyRows }}>
                  <TableCell align="center" colSpan={8}>
                    {emptyRows === 10 ? "No locations found" : ""}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
