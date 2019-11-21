import React, { FC } from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

import Home from './containers/Home/Home';
import Signin from './containers/Signin/Signin';
import Notes from './containers/Note/Notes';
import Signup from './containers/Signup/Signup';
import NewNote from './containers/NewNote/NewNote';
import Settings from './containers/Settings/Settings';
import NotFound from './containers/NotFound/NotFound';

export interface IAppProps {
  checkedAuth: boolean;
}

export interface IRouteProps extends RouteProps {
  appProps: IAppProps;
  path: string;
  exact?: boolean;
}

const Routes: FC<{ appProps: IAppProps }> = ({ appProps }) => {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute
        path="/signin"
        exact
        component={Signin}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/settings"
        exact
        component={Settings}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/notes/new"
        exact
        component={NewNote}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/notes/:id"
        exact
        component={Notes}
        appProps={appProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
