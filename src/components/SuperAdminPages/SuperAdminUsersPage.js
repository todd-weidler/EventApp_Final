import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, FormHelperText } from "@material-ui/core";
import UsersEventsTable from "./UsersEventsTable";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    minWidth: "320px",
    minHeight: "180px",
    marginTop: theme.spacing(25),
    marginLeft: theme.spacing(35),
  },
  unField: {
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const dummyUserEvents = [
  {
    eventId: "ev1",
    eventName: "Basketball Game",
    eventLocation: "UCF Arena",
    role: "Participant",
  },
  {
    eventId: "ev2",
    eventName: "Football Game",
    eventLocation: "Spectrum Stadium",
    role: "Admin",
  },
  {
    eventId: "ev3",
    eventName: "Soccer Game",
    eventLocation: "UCF Field",
    role: "Participant",
  },
  {
    eventId: "ev4",
    eventName: "Theatre Play",
    eventLocation: "UCF Theatre",
    role: "Admin",
  },
  {
    eventId: "ev5",
    eventName: "Food Drive",
    eventLocation: "YMCA Park",
    role: "Participant",
  },
];

export default function SuperAdminUsersPage() {
  const classes = useStyles();

  const [didSearch, setDidSearch] = useState(false);

  const [userEventsData, setUserEventsData] = useState([]);
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (username !== "" && didSearch) {
      // api call

      setUserEventsData(dummyUserEvents);
    }
  }, [username, didSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // api call

    if (username === "") {
      setErrors("Username is required");
    } else {
      setDidSearch(true);
    }

    // if (errors === "") {
    //   setDidSearch(true);
    // }
  };

  const handleChange = (e) => {
    let newVal = e.target.value;

    if (newVal === "") {
      setErrors("Username is required");
    } else {
      setErrors("");
    }

    setUsername(e.target.value);
  };

  const handleBlur = (e) => {
    if (username === "") {
      setErrors("Username is required");
    }
  };

  return (
    <div>
      {didSearch ? (
        <UsersEventsTable userEventsData={userEventsData} username={username} />
      ) : (
        // <UserHostedEventsTable />
        <div>
          <Paper className={classes.searchForm}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems={"center"}
              >
                <Grid item xs={8}>
                  <Typography className={classes.title} align="center">
                    Search for a User's Events
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <div className={classes.unField}>
                    <TextField
                      error={!!errors}
                      // helperText={!!errors ? errors : ""}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                      id="search-by-username"
                      label="Username"
                      variant="outlined"
                      size="small"
                    />
                    {!!errors ? (
                      <FormHelperText error>{errors}</FormHelperText>
                    ) : (
                      <FormHelperText> </FormHelperText>
                    )}
                  </div>
                </Grid>
              </Grid>

              <div className={classes.submitButton}>
                <Button
                  className={classes.button}
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
        </div>
      )}
    </div>
  );
}
