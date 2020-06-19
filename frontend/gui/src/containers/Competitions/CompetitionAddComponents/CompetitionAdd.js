import React, { useState } from "react";
// react plugin for creating date-time-picker
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

// custom components
import RegularButton from "../../../components/CustomButtons/Button";
import { GridContainer } from "../../../components/Grid/GridContainer";
import { GridItem } from "../../../components/Grid/GridItem";
import { CompetitionDistancesAdd } from "./CompetitionDistancesAdd";

const styles = {
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

const baseDistancesObject = {
  name: "",
  distance_km: null,
  ascent: null,
  descent: null,
  ITRA_points: null,
  mountain_level: null,
};

const useStyles = makeStyles(styles);
const apiURL = process.env.REACT_APP_API_URL;

const CompetitionAdd = () => {
  const classes = useStyles();

  const [newCompetition, setNewCompetition] = useState({
    no: null,
    name: "", //required
    location: "", //required
    url: "", //required
    start_date: null, //required
    end_date: null,
    description: "",
    distances: [],
  });
  const [distances, setDistances] = useState([{ ...baseDistancesObject }]);

  const addCompetitions = async (competitionFormData) => {
    try {
      const addData = await fetch(`${apiURL}/api/competitions/`, {
        method: "POST",
        body: JSON.stringify(competitionFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await addData.json();
      console.log(data);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleCompetitionChange = (value, id) => {
    const fieldName = id.split("-")[1];

    setNewCompetition((prevState) => {
      const competitionPrevValue = { ...prevState };
      competitionPrevValue[fieldName] = value;
      return competitionPrevValue;
    });
  };

  const handleDistancesFormNumber = (inputValue) => {
    const numberOfDistancesForms = [...Array(parseInt(inputValue)).keys()];
    setDistances((prevState) => {
      let prevDistances = [...prevState];

      if (prevDistances.length < parseInt(inputValue)) {
        const distancesKeysToAdd = numberOfDistancesForms.filter(
          (item) => !prevDistances[item]
        );

        distancesKeysToAdd.map(() =>
          prevDistances.push({ ...baseDistancesObject })
        );
      } else if (prevDistances.length > parseInt(inputValue)) {
        prevDistances = numberOfDistancesForms.map(
          (item) => prevDistances[item]
        );
      }
      return prevDistances;
    });
  };

  const handleDistancesChange = (value, id) => {
    const index = id.split("-")[1];
    const fieldName = id.split("-")[2];

    setDistances((prevState) => {
      const distanceNewValue = [...prevState];
      distanceNewValue[index][fieldName] = value;
      return distanceNewValue;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const competition = { ...newCompetition };
    competition.distances = [...distances];
    addCompetitions(competition);
  };

  return (
    <section className={classes.section}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={2}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel
                className={classes.labelRoot}
                htmlFor='competition-no'
              >
                Edycja Zawodów
              </InputLabel>
              <Input
                type='number'
                id='competition-no'
                value={newCompetition.no}
                onChange={(e) =>
                  handleCompetitionChange(e.target.value, e.target.id)
                }
              />
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel
                className={classes.labelRoot}
                htmlFor='competition-name'
              >
                Nazwa zawodów
              </InputLabel>
              <Input
                type='text'
                required
                id='competition-name'
                value={newCompetition.name}
                onChange={(e) => {
                  // console.log(e.target.value, e.target.id);
                  handleCompetitionChange(e.target.value, e.target.id);
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel
                className={classes.labelRoot}
                htmlFor='competition-location'
              >
                Lokalizacja
              </InputLabel>
              <Input
                type='text'
                required
                id='competition-location'
                value={newCompetition.location}
                onChange={(e) =>
                  handleCompetitionChange(e.target.value, e.target.id)
                }
              />
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel
                className={classes.labelRoot}
                htmlFor='competition-url'
              >
                URL{" "}
              </InputLabel>
              <Input
                type='text'
                required
                id='competition-url'
                value={newCompetition.url}
                onChange={(e) =>
                  handleCompetitionChange(e.target.value, e.target.id)
                }
              />
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <KeyboardDatePicker
                  autoOk
                  required
                  variant='inline'
                  // inputVariant='outlined']
                  id='competition-start_date'
                  label='Data rozpoczecia zawodów:'
                  format='yyyy-MM-dd'
                  value={newCompetition.start_date}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) =>
                    handleCompetitionChange(
                      date.toISOString().slice(0, 10),
                      "competition-start_date"
                    )
                  }
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <KeyboardDatePicker
                  autoOk
                  variant='inline'
                  // inputVariant='outlined'
                  id='competition-end_date'
                  label='Data zakończenia zawodów:'
                  format='yyyy-MM-dd'
                  value={newCompetition.end_date}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) =>
                    handleCompetitionChange(
                      date.toISOString().slice(0, 10),
                      "competition-end_date"
                    )
                  }
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </GridItem>
          <GridItem>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel
                className={classes.labelRoot}
                htmlFor='competition-description'
              >
                Opis
              </InputLabel>
              <Input
                type='text'
                id='competition-description'
                value={newCompetition.description}
                onChange={(e) =>
                  handleCompetitionChange(e.target.value, e.target.id)
                }
              />
            </FormControl>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={10} sm={10} md={8}>
            <h4 className={classes.subtitle}>
              Wybierz liczbę dystansów w których mogą wystartować zawodnicy
            </h4>
          </GridItem>
          <GridItem xs={2}>
            <br />
            <FormControl className={classes.formControl} fullWidth>
              <OutlinedInput
                type='number'
                inputProps={{
                  min: "0",
                  max: "10",
                  step: "1",
                  pattern: "d+",
                }}
                id='dictances-no'
                inputVariant='outlined'
                value={distances.length}
                onChange={(e) => {
                  handleDistancesFormNumber(e.target.value);
                }}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
        <CompetitionDistancesAdd
          distances={distances}
          handleDistancesChange={handleDistancesChange}
        />
        <GridContainer direction='row' justify='flex-end' alignItems='center'>
          <GridItem xs={12} sm={12} md={2}>
            <RegularButton
              type='submit'
              fullWidth
              size='sm'
              // color='success'
            >
              Dodaj Zawody
            </RegularButton>
          </GridItem>
        </GridContainer>
      </form>
    </section>
  );
};

export { CompetitionAdd };
