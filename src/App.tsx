import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProps } from 'react-router';
import { NavLink, withRouter } from 'react-router-dom';
import { CssBaseline, Button, Container } from '@material-ui/core';

import {
  checkAuthAction,
  signOutAuthAction,
  resetAuthInnerStateAction
} from './store/reducers/auth';

import {
  selectAuthChecking,
  selectAuthChecked,
  selectAuthSignedOut
} from './store/selectors/auth';

import Routes from './Routes';

import Navigation from './components/Navigation/Navigation';

function App({ history }: RouterProps) {
  const { push: historyPush } = history;
  const dispatch = useDispatch();

  const checkingAuth = useSelector(selectAuthChecking);
  const checkedAuth = useSelector(selectAuthChecked);

  const signedOut = useSelector(selectAuthSignedOut);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (signedOut) {
      dispatch(resetAuthInnerStateAction('check'));
      historyPush('/signin');
    }
  }, [signedOut, historyPush, dispatch]);

  function handleLogout() {
    dispatch(signOutAuthAction());
  }

  if (checkingAuth) return null;

  return (
    <>
      <CssBaseline />
      <Navigation>
        {checkedAuth ? (
          <>
            <Button color="inherit" component={NavLink} to="/settings">
              Settings
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/signin">
              Sign in
            </Button>
            <Button color="inherit" component={NavLink} to="/signup">
              Sign up
            </Button>
          </>
        )}
      </Navigation>
      <Container>
        <Routes appProps={{ checkedAuth }} />
      </Container>
    </>
  );
}

export default withRouter(App);
