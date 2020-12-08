import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import MyTextField from "../MyTextField";
import { Field, useField, useFormikContext } from "formik";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";

import { Select, MenuItem, FormHelperText } from "@material-ui/core";
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

// Event Name, Location, date, start time, end time, url,

export default function CreateEventDialog({
  setCustomError,
  customError,
  isOpen,
  handleClose,
  ...formikProps
}) {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = formikProps;

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  // useEffect(() => {}, [customError]);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const getMinEndTime = () => {
  //   let endHour = values.startTime.getHours();
  //   let endMinute = values.startTime.getMinutes();

  //   if (endMinute === 59) {
  //     endMinute = 0;
  //     endHour++;
  //   }

  //   return new Date(0, 0, 0, endHour, endMinute);
  // };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={isOpen}
      onClose={handleClose}
      disableBackdropClick
    >
      <DialogTitle id="add-event-title">Create New Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                <FormControl fullWidth required className={classes.formControl}>
                  <InputLabel id="start-month">Month</InputLabel>
                  <DropDownInput items={monthItems} name={"startMonth"} />
                </FormControl>
              </Grid>

              {/* <Grid item xs={3}>
                <FormControl fullWidth required className={classes.formControl}>
                  <InputLabel id="start-day">Day</InputLabel>
                  <DropDownInput items={monthItems} name={"startDay"} />
                </FormControl>
              </Grid> */}

              <Grid item xs={3}>
                <FormControl fullWidth required className={classes.formControl}>
                  <InputLabel id="start-day">Day</InputLabel>
                  <DaySelect items={monthItems} name={"startDay"} />
                </FormControl>
              </Grid>

              {/* <Grid item xs={3}>
                <FormControl fullWidth required className={classes.formControl}>
                  <InputLabel id="start-year">Year</InputLabel>
                  <DropDownInput items={monthItems} name={"startYear"} />
                </FormControl>
              </Grid> */}
              <Grid item xs={3}>
                <FormControl fullWidth required className={classes.formControl}>
                  <InputLabel id="start-year">Year</InputLabel>
                  <YearSelect items={monthItems} name={"startYear"} />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={9}>
            <Typography variant="subtitle1" className={classes.gradTitle}>
              Event Date
            </Typography>

            <Grid item xs={3}>
              <FormControl fullWidth required className={classes.formControl}>
                <InputLabel id="select-label3">Month</InputLabel>
                <DropDownInput items={monthItems} name={"startMonth"} />
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <DropDownInput items={monthItems} name={"test"} />
            </Grid>

            <Grid item xs={3}>
              <DropDownInput items={monthItems} name={"test"} />
            </Grid>
          </Grid> */}

          <Grid item xs={12}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(handleReset)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// const DateField = ({ field, form, errors, touched, ...other }) => {
//   const currentError = form.errors[field.name];

//   // const errors = other.errors;
//   // const touched = other.touched;
//   // !!errors.date &&
//   // console.log(field.name);
//   // console.log(form.errors[field.name]);

//   return (
//     <KeyboardDatePicker
//       clearable
//       disablePast
//       name={field.name}
//       value={field.value}
//       format="dd/MM/yyyy"
//       helperText={currentError}
//       error={Boolean(currentError)}
//       onError={(error) => {
//         if (error !== currentError) {
//           form.setFieldTouched(field.name, true);
//           form.setFieldError(field.name, error);
//         }
//       }}
//       onChange={(date) => {
//         form.setFieldValue(field.name, date, true);
//       }}
//       {...other}
//     />
//   );
// };

// //
// const MyDatePicker = (props) => {
//   const { setFieldTouched, setFieldValue, setFieldError } = useFormikContext();
//   const [field, meta] = useField(props);
//   // const errors = other.errors;
//   // const touched = other.touched;
//   // !!errors.date &&
//   // console.log(field.name);
//   // console.log(form.errors[field.name]);

//   console.log(meta.error);
//   return (
//     <KeyboardDatePicker
//       clearable
//       disablePast
//       name={field.name}
//       value={field.value}
//       format="dd/MM/yyyy"
//       // helperText={meta.error}
//       error={meta.touched && !!meta.error}
//       onError={(error) => {
//         if (error !== meta.error) {
//           setFieldTouched(field.name, true);
//           setFieldError(field.name, error);
//         }
//       }}
//       onChange={(date) => {
//         setFieldValue(field.name, date, true);
//       }}
//     />
//   );
// };

// const TimeField = ({ field, form, ...other }) => {
//   const currentError = form.errors[field.name];

//   return (
//     <KeyboardTimePicker
//       // clearable
//       disablePast
//       name={field.name}
//       value={field.value}
//       helperText={currentError}
//       error={Boolean(currentError)}
//       onError={(error) => {
//         if (error !== currentError) {
//           form.setFieldError(field.name, error);
//         }
//       }}
//       onChange={(date) => form.setFieldValue(field.name, date, true)}
//       {...other}
//     />
//   );
// };

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

  // const { values } = useFormikContext();

  // const [lowYear, setLowYear] = useState(2020);

  // useEffect(() => {

  //   // let days = getDaysInTheMonth(items.indexOf(values.startMonth));

  //   // let curDate = new Date();
  //   // let curMonth = curDate.getMonth();
  //   // let curYear = curDate.getFullYear();

  //   // if(values.startMonth <= curMonth){
  //   //   setLowYear(2020);
  //   // }
  //   // else{
  //   //   setLowYear()
  //   // }

  //   if (values.startMonth === curMonth && values.startYear === curYear) {
  //     setLowDay(curDate.getDate());
  //   } else {
  //     setLowDay(1);
  //   }

  //   setNumDays(days);
  // }, [values.startMonth, items, values.startDay, values.startYear]);

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
