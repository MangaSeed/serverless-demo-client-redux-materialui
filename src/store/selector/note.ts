import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../reducers';

export const selectNote = (state: AppState) => state.note;

/** NOTE CREATE SELECTOR */
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

/** NOTE REMOVE SELECTOR */
export const selectNoteRemove = createSelector(selectNote, note => note.remove);

export const selectNoteRemoving = createSelector(
  selectNoteRemove,
  remove => remove.removing
);

export const selectNoteRemoved = createSelector(
  selectNoteRemove,
  remove => remove.removed
);

export const selectNoteRemoveError = createSelector(
  selectNoteRemove,
  remove => remove.error
);

/** NOTE UPDATE SELECTOR */
export const selectNoteUpdate = createSelector(selectNote, note => note.update);

export const selectNoteUpdating = createSelector(
  selectNoteUpdate,
  update => update.updating
);

export const selectNoteUpdated = createSelector(
  selectNoteUpdate,
  update => update.updated
);

export const selectNoteUpdateError = createSelector(
  selectNoteUpdate,
  update => update.error
);

export const selectNoteUpdateData = createSelector(
  selectNoteUpdate,
  update => update.data
);
