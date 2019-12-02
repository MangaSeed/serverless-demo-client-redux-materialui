import { all } from 'redux-saga/effects';

import { authSagas } from './auth';

export function* rootSaga() {
  try {
    yield all([...authSagas]);
  } catch (err) {
    console.log('@rootSaga:', err);
    throw err;
  }
}
