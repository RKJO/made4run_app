import React from 'react';
import { Route } from 'react-router-dom';

import CompetitionList from './containers/CompetitionListView';
import CompetitionDetail from './containers/CompetitionDetailView';


const BaseRouter = () => (
    <div>
        <Route exect path='/' component={CompetitionList}/>
        <Route exect path='/:competitionID' component={CompetitionDetail}/>
    </div>
);

export default BaseRouter;