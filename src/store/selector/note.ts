import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../reducers';

export const selectNote = (state: AppState) => state.note;

export const selectNoteCreate = createSelector(selectNote, note => note.create);

export const selectNoteCreating = createSelector(
  selectNoteCreate,
  create => create.creating
);

export const selectNoteCreated = createSelector(
  selectNoteCreate,
  create => create.created
);

export const selectNoteCreateError = createSelector(
  selectNoteCreate,
  create => create.error
);

export const selectNoteCreateData = createSelector(
  selectNoteCreate,
  create => create.data
);
