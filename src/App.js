import React, { useReducer } from 'react';

import { Switch, Route, useHistory } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import Homepage from './Pages/Homepage/Homepage';
import UserInfo from './Pages/UserInfo/UserInfo';
import Spinner from './Components/Spinner/Spinner';

const initialState = {
  userInfo: null,
  userRepo: [],
  loading: false,
  errorMessage: ''
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'GET':
      return {
        ...state,
        userInfo: action.payload,
        errorMessage: ''
      };
    case 'GET_REPOS':
      return {
        ...state,
        userRepo: action.payload,
        loading: false
      }
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'ERROR':
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      }
    default: return state;
  };
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
    
  const history = useHistory();

  const getGithubUser = async (event, username) => {
    event.preventDefault();
    dispatch({type: 'LOADING'});
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const parsedResponse = await response.json();
      
      if(response.status !== 200) {
        const error = new Error();
        error.message = parsedResponse.message;
        throw error;
      };
      
      dispatch({type: 'GET', payload: parsedResponse});
      getUserRepos(parsedResponse.repos_url, parsedResponse.id);
    } catch(err) {
      dispatch({type: 'ERROR', payload: err.message});
    };
  };

  const getUserRepos = async (url, id) => {
    try {
      const response = await fetch(url);
      const parsedResponse = await response.json();

      if(response.status !== 200) {
        const error = new Error();
        error.message = parsedResponse.message;
        throw error;
      };

      dispatch({type: 'GET_REPOS', payload: parsedResponse});
      history.push(`/userinfo/${id}`);
    } catch (err) {
      dispatch({type: 'ERROR', payload: err.message});
    };
  };

  let userInfoRoute = (<Route path='/userinfo/:id' render={() => <UserInfo user={state.userInfo} repos={state.userRepo}/>} />);

  if(!state.userInfo) {
    userInfoRoute = null;
  };
  
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          {userInfoRoute}
          <Route path='/' render={() => <Homepage getUser={getGithubUser} error={state.errorMessage} />} />
        </Switch>
      </Layout>
      {state.loading ? <Spinner /> : null}
    </React.Fragment>
  );
}

export default App;
