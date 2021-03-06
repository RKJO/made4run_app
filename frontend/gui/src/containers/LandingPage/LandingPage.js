import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import { GridContainer } from '../../components/Grid/GridContainer';
import { GridItem } from '../../components/Grid/GridItem';
import { Parallax } from '../../components/Parallax/Parallax.js';

import styles from '../../assets/jss/containers/landingPage';
import { CompetitionsLanding } from './competitionsSection/CompetitionsLanding';

const useStyles = makeStyles(styles);

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Parallax filter image={require('../../assets/img/main_bg.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Made for <span className={classes.danger}>RUN</span>
              </h1>
              <h3>
                Biegaj, trenuj i planuj treningi. Bądź w kontakcie ze swoim
                zespołem.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <main className={classes.main}>
        <div className={classes.container}>
          <CompetitionsLanding />
        </div>
      </main>
    </>
  );
};

LandingPage.propTypes = {};

export { LandingPage };
