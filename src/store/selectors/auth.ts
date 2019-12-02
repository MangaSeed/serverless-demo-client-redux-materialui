import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../reducers';

export const selectAuth = (state: AppState) => state.auth;

/** AUTH ERRORS SELECTOR */
export const selectAuthErrors = createSelector(
  selectAuth,
  ({ activate, signup, signin }) => [activate.error, signup.error, signin.error]
);

/** CHECK AUTH SELECTORS */
export const selectAuthCheck = createSelector(selectAuth, auth => auth.check);

export const selectAuthChecking = createSelector(
  selectAuthCheck,
  check => check.checking
);

export const selectAuthChecked = createSelector(
  selectAuthCheck,
  check => check.checked
);

export const selectAuthCheckError = createSelector(
  selectAuthCheck,
  check => check.error
);

/** ACTIVATE AUTH SELECTORS */
export const selectAuthActivate = createSelector(
  selectAuth,
  auth => auth.activate
);

export const selectAuthActivating = createSelector(
  selectAuthActivate,
  activate => activate.activating
);

export const selectAuthActivated = createSelector(
  selectAuthActivate,
  activate => activate.activated
);

export const selectAuthActivateError = createSelector(
  selectAuthActivate,
  activate => activate.error
);

/** SIGNIN AUTH SELECTORS */
export const selectAuthSignIn = createSelector(selectAuth, auth => auth.signin);

export const selectAuthSigningIn = createSelector(
  selectAuthSignIn,
  signin => signin.signingIn
);

export const selectAuthSignedIn = createSelector(
  selectAuthSignIn,
  signin => signin.signedIn
);

export const selectAuthSignInError = createSelector(
  selectAuthSignIn,
  signin => signin.error
);

/** SIGNOUT AUTH SELECTORS */
export const selectAuthSignOut = createSelector(
  selectAuth,
  auth => auth.signout
);

export const selectAuthSigningOut = createSelector(
  selectAuthSignOut,
  signout => signout.signingOut
);

export const selectAuthSignedOut = createSelector(
  selectAuthSignOut,
  signout => signout.signedOut
);

export const selectAuthSignOutError = createSelector(
  selectAuthSignOut,
  signout => signout.error
);

/** SIGNUP AUTH SELECTORS */
export const selectAuthSignUp = createSelector(selectAuth, auth => auth.signup);

export const selectAuthSigningUp = createSelector(
  selectAuthSignUp,
  signup => signup.signingUp
);

export const selectAuthSignedUp = createSelector(
  selectAuthSignUp,
  signup => signup.signedUp
);

export const selectAuthSignUpError = createSelector(
  selectAuthSignUp,
  signup => signup.error
);
