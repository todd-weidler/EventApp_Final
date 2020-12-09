import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import CreateEventDialog from "./CreateEventDialog";

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

const dummyEventsData = [
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

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const addLocationSchema = Yup.object().shape({
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

export default function CreateEventForm() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);

  const [customError, setCustomError] = useState("");

  useEffect(() => {
    // api call
    setEventsData(dummyEventsData);
  }, []);

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
      setCustomError("Invalid date");
    }

    let idNum = eventsData.length + 1;
    let id = `loc${idNum}`;
    let newLocation = {
      locationId: id,
      ...values,
    };

    setEventsData((current) => [newLocation, ...current]);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (handleReset) => {
    setIsOpen(false);
    handleReset();
  };

  const currentDate = new Date();
  const initialMonth = currentDate.getMonth();
  const initialYear = currentDate.getFullYear();
  const initialDay = currentDate.getDate();

  return (
    <div className={classes.paper}>
      <Toolbar />
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Create New Event
        </Button>

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
          validationSchema={addLocationSchema}
          validateOnChange
          validateOnBlur
        >
          {(props) => (
            <Form className={classes.form} noValidate>
              <CreateEventDialog
                {...props}
                isOpen={isOpen}
                handleClose={handleClose}
              />
            </Form>
          )}
        </Formik>
      </div>
      {/* <LocationsTable locationsData={locationsData} /> */}
    </div>
  );
}

/*
<Formik
          initialValues={{
            locationName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipcode: ""
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
          }}
          validationSchema={addLocationSchema}
          validateOnChange
          validateOnBlur
        >
          {(props) => (
            <Form className={classes.form} noValidate>
              <AddLocationDialog
                {...props}
                isOpen={isOpen}
                handleClose={handleClose}
              />
            </Form>
          )}
        </Formik>
*/
