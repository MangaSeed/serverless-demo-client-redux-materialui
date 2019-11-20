import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addNote, deleteNote, updateNote } from '../../services/note';

import {
  INote,
  CREATE_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  ICreateNotePayload,
  IRemoveNotePayload,
  creatingNoteAction,
  createNoteErrorAction,
  createdNoteAction,
  removingNoteAction,
  removeNoteErrorAction,
  removedNoteAction,
  updateNoteErrorAction,
  updatingNoteAction,
  updatedNoteAction,
  IUpdateNotePayload,
} from '../reducers/note';

export const noteSagas = [
  fork(createNoteSaga),
  fork(deletedNoteSaga),
  fork(updateNoteSaga),
];

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

function* updateNoteSaga() {
  yield takeLatest(UPDATE_NOTE, callUpdateNoteSaga);
}

function* callUpdateNoteSaga({ payload }: PayloadAction<IUpdateNotePayload>) {
  try {
    yield put(updatingNoteAction());
    const { note, attachment } = payload;
    const updated: INote = yield call(updateNote, note, attachment);
    yield put(updatedNoteAction(updated));
  } catch (err) {
    yield put(updateNoteErrorAction(err.message));
  }
}
