import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addNote, deleteNote } from '../../services/note';

import {
  CREATE_NOTE,
  REMOVE_NOTE,
  ICreateNotePayload,
  IRemoveNotePayload,
  creatingNoteAction,
  createNoteErrorAction,
  createdNoteAction,
  removingNoteAction,
  removeNoteErrorAction,
  removedNoteAction,
} from '../reducers/note';

export const noteSagas = [fork(createNoteSaga), fork(deletedNoteSaga)];

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

function* deletedNoteSaga() {
  yield takeLatest(REMOVE_NOTE, callDeleteNoteSaga);
}

function* callDeleteNoteSaga({ payload }: PayloadAction<IRemoveNotePayload>) {
  try {
    yield put(removingNoteAction());
    const { id, fileName } = payload;
    yield call(deleteNote, id, fileName);
    yield put(removedNoteAction());
  } catch (err) {
    yield put(removeNoteErrorAction(err.message));
  }
}
