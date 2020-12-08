import React from "react";

import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import UserInfo from "./pages/UserInfo/UserInfo";
import Spinner from "./components/Spinner/Spinner";
import { StateContext } from "./context/stateContext";

const App = () => {
    const { state } = React.useContext(StateContext);

    return (
        <React.Fragment>
            <Layout>
                <Switch>
                    <Route path="/userinfo/:username" component={UserInfo} />
                    <Route path="/" component={Homepage} />
                </Switch>
            </Layout>
            {state.user.loading ? <Spinner /> : null}
        </React.Fragment>
    );
};

export default App;
