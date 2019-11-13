import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addNote } from '../../services/note';

import {
  CREATE_NOTE,
  ICreateNotePayload,
  creatingNoteAction,
  createNoteErrorAction,
  createdNoteAction,
} from '../reducers/note';

export const noteSagas = [fork(createNoteSaga)];

function* createNoteSaga() {
  yield takeLatest(CREATE_NOTE, callCreateNoteSaga);
}

function* callCreateNoteSaga({ payload }: PayloadAction<ICreateNotePayload>) {
  try {
    yield put(creatingNoteAction());

    const { content, attachment } = payload;
    const created = yield call(addNote, content, attachment);

    yield put(createdNoteAction(created));
  } catch (err) {
    yield put(createNoteErrorAction(err.message));
  }
}
