import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { container, conatinerFluid, section } from "../../assets/jss/main.js";
import { GridContainer } from "../../components/Grid/GridContainer.js";
import { GridItem } from "../../components/Grid/GridItem.js";
import { CustomCard } from "../../components/CustomCard/CustomCard.js";

import CircularProgress from "@material-ui/core/CircularProgress";

const EventListStyles = {
  container,
  conatinerFluid,
  section: {
    padding: "30px 0",
    textAlign: "center",
    color: "black",
    minHeight: "30vh",
  },
};
const useStyles = makeStyles(EventListStyles);
const apiURL = process.env.REACT_APP_API_URL;

const EventsList = () => {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const feachData = async (queryParams = "/") => {
    setLoading(true);

    try {
      const response = await fetch(
        `${apiURL}events/user_workouts${queryParams}`
      );
      const data = await response.json();
      setEvents(data);
    } catch (e) {
      console.log("error", e);
    }

    setLoading(false);
  };

  useEffect(() => {
    feachData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <section className={classes.section}>
          <GridContainer direction='row' justify='center' alignItems='center'>
            {loading ? (
              <CircularProgress color='secondary' />
            ) : (
              events.map((event) => (
                <GridItem xs={12} sm={12} md={3}>
                  <CustomCard data={event} />
                </GridItem>
              ))
            )}
          </GridContainer>
        </section>
      </div>
    </>
  );
};

export { EventsList };
