import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    minWidth: "320px",
    minHeight: "240px",
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(10),
  },
  unField: {
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

export default function SuperAdminUsersPage() {
  const classes = useStyles();

  const [didSearch, setDidSearch] = useState(false);

  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // api call

    if (errors === "") {
      setDidSearch(true);
    }
  };

  const handleChange = (e) => {
    setUsername(e.targer.value);
  };

  return (
    <div>
      {didSearch ? (
        <div>here</div>
      ) : (
        // <UserHostedEventsTable />
        <div>
          <Paper className={classes.searchForm}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={2}>
                <div className={classes.unField}>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    id="search-by-username"
                    label="Username"
                  />
                </div>
              </Grid>

              <div className={classes.submitButton}>
                <Button
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
