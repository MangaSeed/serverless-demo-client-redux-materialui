import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  SAVE_BILL,
  ISaveBillPayload,
  savingBillAction,
  savedBillAction,
  saveBillErrorAction,
} from '../reducers/bill';
import { bill } from '../../services/bill';

export const billSagas = [fork(saveBillSaga)];

function* saveBillSaga() {
  yield takeLatest(SAVE_BILL, callSaveBillSaga);
}

function* callSaveBillSaga({ payload }: PayloadAction<ISaveBillPayload>) {
  try {
    yield put(savingBillAction());
    const { stripe, name, storage } = payload;
    const { token, error } = yield call(stripe.createToken, { name });

    if (error && error.message) throw error;

    yield call(bill, storage, token.id);
    yield put(savedBillAction());
  } catch (err) {
    yield put(saveBillErrorAction(err.message));
  }
}
