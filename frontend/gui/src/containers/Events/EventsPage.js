import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useLocation } from "react-router-dom";

import styles from "../../assets/jss/containers/pageTitleComponent";

import { GridContainer } from "../../components/Grid/GridContainer";
import { GridItem } from "../../components/Grid/GridItem";
import { Parallax } from "../../components/Parallax/Parallax";

import { EventCreate } from "./CreateEventComponents/EventCreate";
import { EventsList } from "./EventsList";
import { EventDetails } from "./EventDetails";

const EventPageStyles = {
  ...styles,
  main: {
    ...styles.main,
    minHeight: "50vh",
  },
};
const useStyles = makeStyles(EventPageStyles);

const EventsPage = (props) => {
  const classes = useStyles();
  const location = useLocation();

  const showHeaderSection = () => {
    switch (location.pathname) {
      case "/events/create_new_event":
        return false;
      default:
        return true;
    }
  };

  return (
    <>
      {showHeaderSection() && (
        <Parallax small filter image={require("../../assets/img/events.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>
                  Treningi <span className={classes.danger}></span>
                </h1>
                <h4>Palnuj treningi, zawody, poznawiaj nowch ludzi.</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      )}
      <main className={classes.main}>
        <Switch>
          <Route path='/events/create_new_event' component={EventCreate} />
          <Route path='/events/:eventID' component={EventDetails} />
          <Route exect path='/events' component={EventsList} />
        </Switch>
      </main>
    </>
  );
};

export { EventsPage };
