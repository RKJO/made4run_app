import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { GridContainer } from "../../components/Grid/GridContainer";
import { GridItem } from "../../components/Grid/GridItem";
import { Parallax } from "../../components/Parallax/Parallax";

import styles from "../../assets/jss/containers/pageTitleComponent";

const useStyles = makeStyles(styles);

const TeamsPage = (props) => {
  const classes = useStyles();

  return (
    <Parallax small filter image={require("../../assets/img/teams.jpg")}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h1 className={classes.title}>
              Dołącz do <span className={classes.danger}>Zespołu</span>
            </h1>
            <h4>Palnuj treningi, zawody, poznawiaj nowch ludzi.</h4>
          </GridItem>
        </GridContainer>
      </div>
    </Parallax>
  );
};

export { TeamsPage };
