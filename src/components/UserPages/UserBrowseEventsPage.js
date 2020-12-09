import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BrowseEventsTable from "./BrowseEventsTable";
import Toolbar from "@material-ui/core/Toolbar";
import CreateEventForm from "./CreateEventForm";
import Button from "@material-ui/core/Button";
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
import { ErrorMessage } from "formik";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     width: "80%",
//     marginTop: theme.spacing(5),
//     marginLeft: theme.spacing(3),
//     marginRight: theme.spacing(3),
//   },
// }));

// export default function UserBrowseEventsPage() {
//   const classes = useStyles();

//   return (
//     <div className={classes.paper}>
//       {/* <Toolbar /> */}
//       {/* <Toolbar /> */}

//       <CreateEventForm />
//       <BrowseEventsTable />
//     </div>
//   );
// }

const useStyles2 = makeStyles((theme) => ({
  searchForm: {
    minWidth: "320px",
    minHeight: "240px",
    marginTop: theme.spacing(25),
    marginLeft: theme.spacing(25),
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
  paper: {
    width: "100%",
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(0),
  },
}));

export default function UserBrowseEventsPage() {
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
        <div className={classes2.paper}>
          <BrowseEventsTable />
        </div>
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
                        // minDate={new Date()}
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
