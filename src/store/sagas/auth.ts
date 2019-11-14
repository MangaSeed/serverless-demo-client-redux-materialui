import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  ACTIVATE_AUTH,
  CHECK_AUTH,
  SIGNIN_AUTH,
  SIGNOUT_AUTH,
  SIGNUP_AUTH,
  signInErrorAuthAction,
  signingInAuthAction,
  signedInAuthAction,
  signingOutAuthAction,
  signOutErrorAuthAction,
  signedOutAuthAction,
  activatingAuthAction,
  activateErrorAuthAction,
  activatedAuthAction,
  signingUpAuthAction,
  signedUpAuthAction,
  signUpErrorAuthAction,
  checkErrorAuthAction,
  checkingAuthAction,
  checkedAuthAction
} from '../reducers/auth';

import { signIn, signOut, activate, signUp, check } from '../../services/auth';

export const authSagas = [
  fork(activateAuthSaga),
  fork(checkAuthSaga),
  fork(signInAuthSaga),
  fork(signOutAuthSaga),
  fork(signUpAuthSaga)
];

function* signInAuthSaga() {
  yield takeLatest(SIGNIN_AUTH, callSignInAuthSaga);
}

function* callSignInAuthSaga({
  payload
}: PayloadAction<{ email: string; password: string }>) {
  try {
    yield put(signingInAuthAction());

    const { email, password } = payload;
    yield call(signIn, email, password);

    yield put(signedInAuthAction());
  } catch (err) {
    yield put(signInErrorAuthAction(err.message));
  }
}

function* signOutAuthSaga() {
  yield takeLatest(SIGNOUT_AUTH, callSignOutAuthSaga);
}

function* callSignOutAuthSaga() {
  try {
    yield put(signingOutAuthAction());
    yield call(signOut);
    yield put(signedOutAuthAction());
  } catch (err) {
    yield put(signOutErrorAuthAction(err.message));
  }
}

function* signUpAuthSaga() {
  yield takeLatest(SIGNUP_AUTH, callSignUpAuthSaga);
}

function* callSignUpAuthSaga({
  payload
}: PayloadAction<{ email: string; password: string }>) {
  try {
    yield put(signingUpAuthAction());

    const { email, password } = payload;
    yield call(signUp, email, password);

    yield put(signedUpAuthAction());
  } catch (err) {
    yield put(signUpErrorAuthAction(err.message));
  }
}

function* activateAuthSaga() {
  yield takeLatest(ACTIVATE_AUTH, callActivateAuthSaga);
}

function* callActivateAuthSaga({
  payload
}: PayloadAction<{ email: string; code: string }>) {
  try {
    yield put(activatingAuthAction());

    const { email, code } = payload;
    yield call(activate, email, code);

    yield put(activatedAuthAction());
  } catch (err) {
    yield put(activateErrorAuthAction(err.message));
  }
}

function* checkAuthSaga() {
  yield takeLatest(CHECK_AUTH, callCheckAuthSaga);
}

function* callCheckAuthSaga() {
  try {
    yield put(checkingAuthAction());
    yield call(check);
    yield put(checkedAuthAction(true));
  } catch (err) {
    yield put(checkErrorAuthAction(err.message));
  }
}
