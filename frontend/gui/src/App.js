import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { AuthState } from "./context/auth/AuthState";
import { AlertState } from "./context/alert/AlertState";

import { BaseLayout } from "./containers/BaseLayout";
import { LandingPage } from "./containers/LandingPage/LandingPage";
import { CompetitionsPage } from "./containers/Competitions/CompetitionsPage";
import { TeamsPage } from "./containers/Teams/TeamsPage";
import { EventsPage } from "./containers/Events/EventsPage";

import { Credits } from "./containers/Credits/Credtis";

import { RegistrationPage } from "./containers/Registration/RegistrationPage";

const App = (props) => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <BaseLayout>
            <Switch>
              {/* <Route
            exect
            path='/competitions/:competitionSlug'
            component={CompetitionDetail}
          /> */}
              <Route path='/events*' component={EventsPage} />
              <Route path='/teams*' component={TeamsPage} />
              <Route path='/competitions*' component={CompetitionsPage} />
              <Route path='/credits' component={Credits} />
              <Route path='/registration*' component={RegistrationPage} />
              <Route exect path='/' component={LandingPage} />
            </Switch>
          </BaseLayout>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
