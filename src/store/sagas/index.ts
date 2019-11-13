import { all } from 'redux-saga/effects';

import { noteSagas } from './note';

export function* rootSaga() {
  try {
    yield all([...noteSagas]);
  } catch (err) {
    console.log('@rootSaga:', err);
    throw err;
  }
}
