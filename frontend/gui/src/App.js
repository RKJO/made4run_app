import React from 'react';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';
import CompetitionList from './containers/CompetitionListView';

function App() {
  return (
    <div className="App">
      <CustomLayout>
        <CompetitionList />
      </CustomLayout>
    </div>
  );
}

export default App;
