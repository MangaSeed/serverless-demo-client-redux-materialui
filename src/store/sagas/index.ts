import { all } from 'redux-saga/effects';

import { authSagas } from './auth';
import { billSagas } from './bill';

export function* rootSaga() {
  try {
    yield all([...authSagas, ...billSagas]);
  } catch (err) {
    console.log('@rootSaga:', err);
    throw err;
  }
}
