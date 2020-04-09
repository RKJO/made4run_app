import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { GridContainer } from "../../components/Grid/GridContainer";
import { GridItem } from "../../components/Grid/GridItem";
import { Parallax } from "../../components/Parallax/Parallax";

import { CompetitionList } from "../Competitions/CompetitionList";

import styles from "../../assets/jss/containers/pageTitleComponent";

const useStyles = makeStyles(styles);

const CompetitionsPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <Parallax
        small
        filter
        image={require("../../assets/img/competitions.jpg")}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Kalendarz <span className={classes.danger}>Zawodów</span>
              </h1>
              <h4>Zajdź zawody w których chesz wystartować.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <main className={classes.main}>
        <div className={classes.container}>
          <CompetitionList />
        </div>
      </main>
    </>
  );
};

export { CompetitionsPage };
