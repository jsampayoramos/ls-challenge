import { useState } from 'react';

import { Switch, Route } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import Homepage from './Pages/Homepage/Homepage';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  
  const getGithubUser = async (event, username) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const parsedResponse = await response.json();
      setUserInfo(parsedResponse);
      getUserRepos(parsedResponse.repos_url);
    } catch(error) {
      console.log(error);
    };
  };

  const getUserRepos = async url => {
    try {
      const response = await fetch(url);
      const parsedResponse = await response.json();
      console.log(parsedResponse);
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <Layout>
      <Switch>
        <Route path='/' render={() => <Homepage getUser={getGithubUser} />} />
      </Switch>
    </Layout>
  );
}

export default App;
