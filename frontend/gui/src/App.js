import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { BaseLayout } from "./containers/BaseLayout";
import { LandingPage } from "./containers/LandingPage/LandingPage";
import { CompetitionsPage } from "./containers/Competitions/CompetitionsPage";

import { Credits } from "./containers/Credits/Credtis";

function App(props) {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          {/* <Route
            exect
            path='/competitions/:competitionSlug'
            component={CompetitionDetail}
          /> */}
          <Route path='/competitions' component={CompetitionsPage} />
          <Route path='/credits' component={Credits} />
          <Route exect path='/' component={LandingPage} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  );
}

export default App;
