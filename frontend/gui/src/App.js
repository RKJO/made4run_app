import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { AuthState } from "./context/auth/AuthState";
import { BaseLayout } from "./containers/BaseLayout";
import { LandingPage } from "./containers/LandingPage/LandingPage";
import { CompetitionsPage } from "./containers/Competitions/CompetitionsPage";
import { TeamsPage } from "./containers/Teams/TeamsPage";
import { EventsPage } from "./containers/Events/EventsPage";

import { Credits } from "./containers/Credits/Credtis";

import { LoginPage } from "./containers/Registration/LoginPage";
import { RegisterPage } from "./containers/Registration/RegisterPage";

const App = (props) => {
  return (
    <AuthState>
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
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
            <Route exect path='/' component={LandingPage} />
          </Switch>
        </BaseLayout>
      </Router>
    </AuthState>
  );
};

export default App;
