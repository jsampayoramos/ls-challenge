import { useState } from 'react';

import { Switch, Route, useHistory } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import Homepage from './Pages/Homepage/Homepage';
import UserInfo from './Pages/UserInfo/UserInfo';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  
  const history = useHistory();

  const getGithubUser = async (event, username) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const parsedResponse = await response.json();
      setUserInfo(parsedResponse);
      getUserRepos(parsedResponse.repos_url, parsedResponse.id);
    } catch(error) {
      console.log(error);
    };
  };

  const getUserRepos = async (url, id) => {
    try {
      const response = await fetch(url);
      const parsedResponse = await response.json();
      setUserRepos(parsedResponse);
      history.push(`/userinfo/${id}`);
    } catch (error) {
      console.log(error);
    };
  };
  console.log(userInfo)
  console.log(userRepos)
  return (
    <Layout>
      <Switch>
        <Route path='/userinfo/:id' render={() => <UserInfo user={userInfo} repos={userRepos}/>} />
        <Route path='/' render={() => <Homepage getUser={getGithubUser} />} />
      </Switch>
    </Layout>
  );
}

export default App;
