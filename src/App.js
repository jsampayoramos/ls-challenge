import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import Homepage from './Pages/Homepage/Homepage';
import UserInfo from './Pages/UserInfo/UserInfo';
import Spinner from './Components/Spinner/Spinner';
import { StateContext } from './context/stateContext';

const App = () => {
  const { state } = React.useContext(StateContext);
  
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route path='/userinfo/:id' component={UserInfo} />
          <Route path='/' component={Homepage} />
        </Switch>
      </Layout>
      {state.loading ? <Spinner /> : null}
    </React.Fragment>
  );
}

export default App;
