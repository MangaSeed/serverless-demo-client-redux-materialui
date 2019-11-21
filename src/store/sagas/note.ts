import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  addNote,
  deleteNote,
  updateNote,
  fetchNote
} from '../../services/note';

import {
  INote,
  CREATE_NOTE,
  FETCH_NOTE,
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
  fetchNoteErrorAction,
  fetchingNoteAction,
  fetchedNoteAction
} from '../reducers/note';

export const noteSagas = [
  fork(createNoteSaga),
  fork(fetchNoteSaga),
  fork(deletedNoteSaga),
  fork(updateNoteSaga)
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

function* removeNoteSaga() {
  yield takeLatest(REMOVE_NOTE, callRemoveNoteSaga);
}

function* callRemoveNoteSaga({ payload }: PayloadAction<IRemoveNotePayload>) {
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

function* fetchNoteSaga() {
  yield takeLatest(FETCH_NOTE, callFetchNoteSaga);
}

function* callFetchNoteSaga({ payload }: PayloadAction<string>) {
  try {
    yield put(fetchingNoteAction());
    const fetched: INote = yield call(fetchNote, payload);
    yield put(fetchedNoteAction(fetched));
  } catch (err) {
    yield put(fetchNoteErrorAction(err.message));
  }
}
