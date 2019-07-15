import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Routes type
import PrivateRoute from '../components/Routing/PrivateRoute';
import PublicRoute from '../components/Routing/PublicRoute';

// Pages
import LeaguesPage from "../pages/LeaguesPage";
import Home from "../pages/Home";
import FourHandedFourError from '../pages/FourHandedFourError';
import Profile from '../pages/Profile';
import ProfileSettings from '../pages/ProfileSettings';

// Styles
import "../assets/css/style.css";

// Redux
import { Provider } from "react-redux";
import store from "../redux/store";
import { loadUser } from "../redux/actions/auth";

// Auth
import setAuthToken from "../utils/setAuthToken";

if (localStorage.Authorization) {
  setAuthToken(localStorage.Authorization);
}

const AppRouter = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <PrivateRoute path="/ligas" exact component={LeaguesPage} />
        <PrivateRoute path="/perfil" exact component={Profile} />
        <PrivateRoute path="/editar-perfil" exact component={ProfileSettings} />
        <Route path="*" component={FourHandedFourError} />
      </Switch>
    </Provider>
  );
};

export default AppRouter;
