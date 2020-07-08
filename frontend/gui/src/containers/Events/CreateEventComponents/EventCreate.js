import React, { useState } from "react";
import { container, conatinerFluid } from "../../../assets/jss/main.js";

// react plugin for creating date-time-picker
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
// custom components
import { GridContainer } from "../../../components/Grid/GridContainer";
import { GridItem } from "../../../components/Grid/GridItem";
import { BaseMap } from "./BaseMap";
import { Sidebar } from "../../../components/Sidebar/Sidebar";

const styles = {
  container,
  conatinerFluid,
  labelRoot: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px",
    },
  },
  section: {
    padding: "10px 0",
    textAlign: "center",
    color: "black",
    minHeight: "49vh",
  },
  formControl: {
    margin: "0 0 2px 0",
    paddingTop: "15px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
  subtitle: {
    fontSize: "1.313rem",
    // maxWidth: "500px",
    margin: "40px auto 0",
  },
};

const useStyles = makeStyles(styles);

const EventCreate = () => {
  const classes = useStyles();

  const [newEvent, setNewEvent] = useState({ name: "", distance: "" });

  const handleEventChange = (value, id) => {
    const fieldName = id.split("-")[1];

    setNewEvent((prevState) => {
      const EventPrevValue = { ...prevState };
      EventPrevValue[fieldName] = value;
      return EventPrevValue;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Sidebar>
        <div className={classes.container}>
          <form onSubmit={(event) => handleSubmit(event)}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <br />
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel
                    className={classes.labelRoot}
                    htmlFor='event-name'
                  >
                    Nazwa treningu
                  </InputLabel>
                  <Input
                    type='text'
                    required
                    id='event-name'
                    value={newEvent.name}
                    onChange={(e) => {
                      // console.log(e.target.value, e.target.id);
                      handleEventChange(e.target.value, e.target.id);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <br />
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel
                    className={classes.labelRoot}
                    htmlFor='event-distance'
                  >
                    Dystans
                  </InputLabel>
                  <Input
                    type='number'
                    id='event-distance'
                    value={""}
                    onChange={(e) => console.log(e.target.value, e.target.id)}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <br />
                <FormControl className={classes.formControl} fullWidth>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={plLocale}
                  >
                    <KeyboardDatePicker
                      autoOk
                      required
                      variant='inline'
                      // inputVariant='outlined']
                      id='event-start_date'
                      label='Data treningu :'
                      format='yyyy-MM-dd'
                      value={newEvent.start_date}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) =>
                        handleEventChange(
                          date.toISOString().slice(0, 10),
                          "event-start_date"
                        )
                      }
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <br />
                <FormControl className={classes.formControl} fullWidth>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={plLocale}
                  >
                    <KeyboardTimePicker
                      autoOk
                      // inputVariant='outlined'
                      id='event-end_date'
                      label='Godzina:'
                      // format='yyyy-MM-dd'
                      ampm={false}
                      minutesStep={5}
                      value={newEvent.end_date}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) =>
                        handleEventChange(date, "event-end_date")
                      }
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel
                    className={classes.labelRoot}
                    htmlFor='event-desription'
                  >
                    Opis treningu
                  </InputLabel>

                  <Input
                    type='text'
                    required
                    id='event-desription'
                    value={newEvent.desription}
                    onChange={(e) => {
                      // console.log(e.target.value, e.target.id);
                      handleEventChange(e.target.value, e.target.id);
                    }}
                  />
                </FormControl>
              </GridItem>
            </GridContainer>
          </form>
        </div>
      </Sidebar>
      <BaseMap />
    </>
  );
};

export { EventCreate };
