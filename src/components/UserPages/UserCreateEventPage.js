import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import Typography from "@material-ui/core/Typography";
import MyTextField from "../MyTextField";
import { useField, useFormikContext } from "formik";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
//   DatePicker,
// } from "@material-ui/pickers";

import {
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { getDaysInTheMonth } from "../../utilityFunctions";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  dialogPaper: {
    minWidth: "575px",
  },
  startDate: {
    marginLeft: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(15),
    marginLeft: theme.spacing(30),
    minHeight: "500px",
    minWidth: "400px",
    paddingTop: theme.spacing(3),
    maxWidth: "600px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  button: {
    marginBottom: theme.spacing(3),
  },
}));

const monthItems = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dummyLocations = [
  {
    label: "UCF Theatre",
    value: "loc1",
  },
  {
    label: "UCF Stadium",
    value: "loc2",
  },
  {
    label: "Salvation Army",
    value: "loc3",
  },
  {
    label: "YMCA Park",
    value: "loc4",
  },
];

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     width: "100%",
//     marginTop: theme.spacing(5),
//     marginLeft: theme.spacing(7),
//     marginRight: theme.spacing(7),
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const createEventSchema = Yup.object().shape({
  eventName: Yup.string().required("Event Name Required"),
  locationName: Yup.string().required("Event Location Required"),
  url: Yup.string().required("Event Website Required"),
  startMonth: Yup.string().required("Month is required").nullable(),
  startDay: Yup.string().required("Day is required").nullable(),
  startYear: Yup.string().required("Year is required").nullable(),
  endMonth: Yup.string().required("Month is required").nullable(),
  endDay: Yup.string().required("Day is required").nullable(),
  endYear: Yup.string().required("Year is required").nullable(),
});

// Event Name, Location, date, start time, end time, url,

export default function UserCreateEventPage() {
  //   const {
  //     values,
  //     touched,
  //     errors,

  //     handleChange,
  //     handleBlur,
  //     handleSubmit,

  //   } = formikProps;

  const classes = useStyles();

  const currentDate = new Date();
  const initialMonth = currentDate.getMonth();
  const initialYear = currentDate.getFullYear();
  const initialDay = currentDate.getDate();

  //   const [selectedDate, setSelectedDate] = useState(
  //     new Date("2014-08-18T21:11:54")
  //   );

  const handleSubmit = (values) => {
    let currentDate = new Date();

    let submittedDate = new Date(
      values.startYear,
      values.startMonth - 1,
      values.startDay,
      23,
      59,
      59
    );

    if (submittedDate.getTime() <= currentDate.getTime()) {
      //   setCustomError("Invalid date");
    }

    // let idNum = eventsData.length + 1;
    // let id = `loc${idNum}`;
    // let newLocation = {
    //   locationId: id,
    //   ...values,
    // };
  };

  return (
    <Formik
      initialValues={{
        eventName: "",
        locationName: "",
        url: "",
        startMonth: initialMonth,
        startDay: initialDay,
        startYear: initialYear,
        endMonth: initialMonth,
        endDay: initialDay,
        endYear: initialYear,
      }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm({});
      }}
      validationSchema={createEventSchema}
      validateOnChange
      validateOnBlur
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form className={classes.form} noValidate>
          <Paper className={classes.container}>
            <div className={classes.title}>
              <Typography variant="h6" align="center">
                Create a New Event
              </Typography>
            </div>

            <Grid container spacing={2} alignItems="center" justify="center">
              <Grid item xs={9}>
                <MyTextField
                  className={classes.textfield}
                  margin="dense"
                  id="eventName"
                  label="Event Name"
                  type="text"
                  name="eventName"
                  hasError={touched.eventName && !!errors.eventName}
                  errorMsg={errors.eventName}
                  value={values.eventName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={9}>
                <div>
                  <Typography variant="subtitle1" align="flex-start">
                    <strong>Start Date:</strong>
                  </Typography>
                </div>
              </Grid>

              <Grid container spacing={1}>
                <Grid
                  container
                  item
                  xs={12}
                  spacing={3}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="start-month">Month</InputLabel>
                      <DropDownInput items={monthItems} name={"startMonth"} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="start-day">Day</InputLabel>
                      <DaySelect items={monthItems} name={"startDay"} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="start-year">Year</InputLabel>
                      <YearSelect items={monthItems} name={"startYear"} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <div>
                  <Typography variant="subtitle1" align="flex-start">
                    <strong>End Date:</strong>
                  </Typography>
                </div>
              </Grid>
              <Grid container spacing={1}>
                <Grid
                  container
                  item
                  xs={12}
                  spacing={3}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="end-month">Month</InputLabel>
                      <DropDownInput items={monthItems} name={"endMonth"} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="end-day">Day</InputLabel>
                      <DaySelect items={monthItems} name={"endDay"} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl
                      fullWidth
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="end-year">Year</InputLabel>
                      <YearSelect items={monthItems} name={"endYear"} />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <MyTextField
                  className={classes.textfield}
                  margin="dense"
                  id="url"
                  label="Event Website"
                  type="text"
                  name="url"
                  hasError={touched.url && !!errors.url}
                  errorMsg={errors.url}
                  value={values.url}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleSubmit}
                color="primary"
              >
                Create
              </Button>
            </div>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 200,
  },
}));

function DropDownInput({ items, ...props }) {
  const classes2 = useStyles2();

  const [field, meta] = useField(props);

  return (
    <>
      <Select
        fullWidth
        {...field}
        error={meta.touched && !!meta.error}
        labelId="select-label2"
        className={classes2.selectEmpty}
        MenuProps={{ classes: { paper: classes2.menuPaper } }}
      >
        {items.map((item) => (
          <MenuItem key={item} value={items.indexOf(item)}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && !!meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : (
        <FormHelperText> </FormHelperText>
      )}
    </>
  );
}

const daysArr = Array.from(new Array(31), (x, i) => i + 1);

function DaySelect({ items, ...props }) {
  const classes2 = useStyles2();

  const [field, meta] = useField(props);

  const { values } = useFormikContext();

  const [numDays, setNumDays] = useState(30);
  const [lowDay, setLowDay] = useState(1);

  useEffect(() => {
    // let days = getDaysInTheMonth(items.indexOf(values.startMonth));
    let days = getDaysInTheMonth(values.startMonth + 1, values.startYear);
    let curDate = new Date();
    let curMonth = curDate.getMonth();
    let curYear = curDate.getFullYear();

    if (values.startMonth === curMonth && values.startYear === curYear) {
      setLowDay(curDate.getDate());
    } else {
      setLowDay(1);
    }

    setNumDays(days);
  }, [values.startMonth, items, values.startDay, values.startYear]);

  return (
    <>
      <Select
        fullWidth
        {...field}
        error={meta.touched && !!meta.error}
        labelId="select-label2"
        className={classes2.selectEmpty}
        MenuProps={{ classes: { paper: classes2.menuPaper } }}
      >
        {daysArr.slice(lowDay - 1, numDays).map((day) => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && !!meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : (
        <FormHelperText> </FormHelperText>
      )}
    </>
  );
}

const yearsArr = Array.from(new Array(5), (x, i) => i + 2020);

function YearSelect({ items, ...props }) {
  const classes2 = useStyles2();

  const [field, meta] = useField(props);

  return (
    <>
      <Select
        fullWidth
        {...field}
        error={meta.touched && !!meta.error}
        labelId="select-label2"
        className={classes2.selectEmpty}
        MenuProps={{ classes: { paper: classes2.menuPaper } }}
      >
        {yearsArr.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && !!meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : (
        <FormHelperText> </FormHelperText>
      )}
    </>
  );
}
