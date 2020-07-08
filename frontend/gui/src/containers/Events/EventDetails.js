import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { container, conatinerFluid, section } from "../../assets/jss/main.js";
import { GridContainer } from "../../components/Grid/GridContainer.js";
import { GridItem } from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import { Card } from "../../components/Card/Card";
import { CardHeader } from "../../components/Card/CardHeader";
import { CardAvatar } from "../../components/Card/CardAvatar";
import { CardBody } from "../../components/Card/CardBody";
import { MapDisplayGPX } from "../Events/MapDisplayGPX";
import { CircularProgress } from "@material-ui/core";

const EventDetailsStyles = {
  conatinerFluid,
  container,

  section: {
    padding: "60px 0",
    minHeight: "30vh",
  },
  sectionMap: {
    padding: "30px 0 0 0",
    textAlign: "center",
    color: "black",
    minHeight: "55vh",
  },
  cadrBodyGrid: {
    padding: "0 20px",
  },
};
const useStyles = makeStyles(EventDetailsStyles);
const apiURL = process.env.REACT_APP_API_URL;

const EventDetails = (props) => {
  const classes = useStyles();

  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  const feachData = async () => {
    setLoading(true);
    const eventID = props.match.params.eventID;
    try {
      const response = await fetch(`${apiURL}events/user_workouts/${eventID}`);
      const data = await response.json();
      setEvent(data);
    } catch (e) {
      console.log("error", e);
    }

    setLoading(false);
  };

  useEffect(() => {
    feachData();
  }, []);

  console.log("description", event.description);
  return (
    <>
      {loading ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          <div className={classes.container}>
            <section className={classes.section}>
              <GridContainer
                direction='row'
                justify='center'
                alignItems='center'
              >
                <GridItem xs={12} sm={12} md={4}>
                  <Card profile>
                    <CardAvatar profile>
                      <img
                        // className={classes.imgAvatar}
                        src={event.create_by ? event.create_by.avatar : ""}
                        alt='...'
                      />
                    </CardAvatar>
                    <CardBody profile>
                      <h6 className={classes.cardCategory}>
                        Trening utworzony przez
                      </h6>
                      <h4 className={classes.cardTitle}>
                        {event.create_by ? event.create_by.first_name : ""}
                      </h4>
                      <p className={classes.description}>
                        {event.create_by ? event.create_by.note : ""}
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <Card>
                    <CardHeader color='danger'>
                      <h4 className={classes.cardTitleWhite}>
                        Trening: {event.name}
                      </h4>
                      <p className={classes.cardCategoryWhite}>
                        Start {event.start_date}, o godzinie: {event.start_time}
                      </p>
                    </CardHeader>
                    <CardBody plain>
                      <GridContainer
                        className={classes.cadrBodyGrid}
                        direction='row'
                        justify='center'
                        alignItems='center'
                      >
                        <GridItem xs={12} sm={6} md={3}>
                          <h5 className={classes.cardCategory}>Dystans:</h5>
                          <p>{event.distance_km} km</p>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                          <h5 className={classes.cardCategory}>
                            Planowane tempo:
                          </h5>
                          <p>
                            {event.peace
                              ? `${event.peace} min/km`
                              : "nie podano"}{" "}
                          </p>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                          <h5 className={classes.cardCategory}>
                            Wzniesienie terenu:
                          </h5>
                          <p>
                            {event.descent ? `${event.ascent} m` : "nie podano"}
                          </p>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                          <h5 className={classes.cardCategory}>
                            Spadek terenu:
                          </h5>
                          <p>
                            {event.descent
                              ? `${event.descent} m`
                              : "nie podano"}
                          </p>
                        </GridItem>
                        <GridItem xs>
                          <p className={classes.description}>
                            {event.description
                              ? event.description
                              : "nie dodano opisu"}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>

              {/* <GridContainer direction='row' justify='center' alignItems='center'>
              <GridItem xs={12} sm={12} md={10}>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}></GridItem>
            </GridContainer> */}
            </section>
          </div>
          <section className={classes.sectionMap}>
            <MapDisplayGPX mapLG zoomControl gpx={event.gpx} />
          </section>
        </>
      )}
    </>
  );
};

export { EventDetails };
