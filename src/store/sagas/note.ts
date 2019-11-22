import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  addNote,
  deleteNote,
  fetchNote,
  fetchNoteList,
  updateNote
} from '../../services/note';

import {
  INote,
  CREATE_NOTE,
  FETCH_NOTE,
  FETCH_NOTE_LIST,
  REMOVE_NOTE,
  UPDATE_NOTE,
  ICreateNotePayload,
  IRemoveNotePayload,
  IUpdateNotePayload,
  creatingNoteAction,
  createNoteErrorAction,
  createdNoteAction,
  removingNoteAction,
  removeNoteErrorAction,
  removedNoteAction,
  updateNoteErrorAction,
  updatingNoteAction,
  updatedNoteAction,
  fetchNoteErrorAction,
  fetchingNoteAction,
  fetchedNoteAction,
  fetchNoteListErrorAction,
  fetchingNoteListAction,
  fetchedNoteListAction
} from '../reducers/note';

export const noteSagas = [
  fork(createNoteSaga),
  fork(fetchNoteListSaga),
  fork(fetchNoteSaga),
  fork(removeNoteSaga),
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

function* fetchNoteListSaga() {
  yield takeLatest(FETCH_NOTE_LIST, callFetchNoteListSaga);
}

function* callFetchNoteListSaga() {
  try {
    yield put(fetchingNoteListAction());
    const list: INote[] = yield call(fetchNoteList);
    yield put(fetchedNoteListAction(list));
  } catch (err) {
    yield put(fetchNoteListErrorAction(err.message));
  }
}
