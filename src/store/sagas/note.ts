import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addNote } from '../../services/note';

import {
  CREATE_TASK,
  ICreateNotePayload,
  creatingTaskAction,
  createTaskErrorAction,
  createdTaskAction
} from '../reducers/note';

export const noteSagas = [fork(createNoteSaga)];

function* createNoteSaga() {
  yield takeLatest(CREATE_TASK, callCreateTaskSaga);
}

function* callCreateTaskSaga({ payload }: PayloadAction<ICreateNotePayload>) {
  try {
    yield put(creatingTaskAction());

    const { content, attachment } = payload;
    const created = yield call(addNote, content, attachment);

    yield put(createdTaskAction(created));
  } catch (err) {
    yield put(createTaskErrorAction(err.message));
  }
}
