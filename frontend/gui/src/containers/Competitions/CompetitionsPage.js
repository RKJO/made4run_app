import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import { GridContainer } from '../../components/Grid/GridContainer';
import { GridItem } from '../../components/Grid/GridItem';
import { Parallax } from '../../components/Parallax/Parallax';

import { CompetitionList } from './CompetitionList';

import styles from '../../assets/jss/containers/pageTitleComponent';
import { Switch, Route } from 'react-router-dom';
import { CompetitionAdd } from './CompetitionAddComponents/CompetitionAdd';

const useStyles = makeStyles(styles);

const CompetitionsPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <Parallax
        small
        filter
        image={require('../../assets/img/competitions.jpg')}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Kalendarz <span className={classes.danger}>Zawodów</span>
              </h1>
              <h4>Znajdź zawody w których chcesz wystartować.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <main className={classes.main}>
        <div className={classes.container}>
          <Switch>
            <Route path='/competitions/add' component={CompetitionAdd} />
            <Route exect path='/competitions' component={CompetitionList} />
            {/* <Route
            exect
            path='/competitions/:competitionSlug'
            component={CompetitionDetail}
          /> */}
          </Switch>
        </div>
      </main>
    </>
  );
};

export { CompetitionsPage };
