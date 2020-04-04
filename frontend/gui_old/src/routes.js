import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CompetitionList from './containers/CompetitionListView';
import CompetitionDetail from './containers/CompetitionDetailView';


const BaseRouter = () => (
    <Switch>
        <Route exect path='/competitions/:competitionSlug' component={CompetitionDetail}/>
        <Route exect path='/competitions' component={CompetitionList}/>
    </Switch>
);

export default BaseRouter;