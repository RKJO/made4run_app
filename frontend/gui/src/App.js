import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Header } from "./components/Header/Header";
import { HeaderLinks } from "./components/Header/HeaderLinks";

import { GridContainer } from "./components/Grid/GridContainer";
import { GridItem } from "./components/Grid/GridItem";
import Button from "./components/CustomButtons/Button";
import { Parallax } from "./components/Parallax/Parallax.js";

import styles from "./assets/jss/containers/landingPage";

const useStyles = makeStyles(styles);

function App(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <>
      <Header
        color='transparent'
        brand='Made4Run'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("./assets/img/main_bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Made for <span className={classes.danger}>RUN</span>
              </h1>
              <h3>
                Biegaj, trenuj i planuj treningii. Bądź w kontakcie ze swoim
                zespołem.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </>
  );
}

export default App;
