import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

/** NOTE INTERFACES */
export interface INote {
  userId: string;
  noteId: string;
  content: string;
  createdAt: number;
  attachment?: string;
  attachmentURL?: string;
}

interface INoteCreateState {
  creating: boolean;
  created: boolean;
  error: string;
  data: INote | null;
}

interface INoteRemoveState {
  removing: boolean;
  removed: boolean;
  error: string;
}

interface INoteUpdateState {
  updating: boolean;
  updated: boolean;
  error: string;
  data: INote | null;
}

interface INoteState {
  create: INoteCreateState;
  remove: INoteRemoveState;
  update: INoteUpdateState;
}

export interface ICreateNotePayload {
  content: string;
  attachment?: File;
}

export interface IRemoveNotePayload {
  id: string;
  fileName?: string;
}

export interface IUpdateNotePayload {
  note: INote;
  attachment?: File | null;
}

interface ICreateNoteAction {
  payload: ICreateNotePayload;
}

interface IRemoveNoteAction {
  payload: IRemoveNotePayload;
}

interface IUpdateNoteAction {
  payload: IUpdateNotePayload;
}

/** NOTE ACTION TYPES */

type CreateNoteActionType = (params: ICreateNotePayload) => ICreateNoteAction;
type RemoveNoteActionType = (params: IRemoveNotePayload) => IRemoveNoteAction;
type UpdateNoteActionType = (params: IUpdateNotePayload) => IUpdateNoteAction;

/** NOTE CONSTANTS */
export const CREATE_NOTE = 'note/createNoteAction';
export const REMOVE_NOTE = 'note/removeNoteAction';
export const UPDATE_NOTE = 'note/updateNoteAction';

const INIT_NOTE_CREATE_STATE: INoteCreateState = {
  creating: false,
  created: false,
  error: '',
  data: null,
};

const INIT_NOTE_REMOVE_STATE: INoteRemoveState = {
  removing: false,
  removed: false,
  error: '',
};

const INIT_NOTE_UPDATE_STATE: INoteUpdateState = {
  updating: false,
  updated: false,
  error: '',
  data: null,
};

const INIT_NOTE_STATE: INoteState = {
  create: INIT_NOTE_CREATE_STATE,
  remove: INIT_NOTE_REMOVE_STATE,
  update: INIT_NOTE_UPDATE_STATE,
};

/** NOTE SLICE CONFIG */
const noteSlice = createSlice({
  name: 'note',
  initialState: INIT_NOTE_STATE,
  reducers: {
    creatingNoteAction: state => {
      state.create = { ...INIT_NOTE_CREATE_STATE, creating: true };
    },

    createdNoteAction: (state, { payload }: PayloadAction<INote>) => {
      state.create = {
        ...INIT_NOTE_CREATE_STATE,
        created: true,
        data: payload,
      };
    },

    createNoteErrorAction: (state, { payload }: PayloadAction<string>) => {
      state.create = {
        ...INIT_NOTE_CREATE_STATE,
        error: payload,
      };
    },

    removingNoteAction: state => {
      state.remove = { ...INIT_NOTE_REMOVE_STATE, removing: true };
    },

    removedNoteAction: state => {
      state.remove = { ...INIT_NOTE_REMOVE_STATE, removed: true };
    },

    removeNoteErrorAction: (state, { payload }: PayloadAction<string>) => {
      state.remove = { ...INIT_NOTE_REMOVE_STATE, error: payload };
    },

    updatingNoteAction: state => {
      state.update = { ...INIT_NOTE_UPDATE_STATE, updating: true };
    },

    updatedNoteAction: (state, { payload }: PayloadAction<INote>) => {
      state.update = {
        ...INIT_NOTE_UPDATE_STATE,
        updated: true,
        data: payload,
      };
    },

    updateNoteErrorAction: (state, { payload }: PayloadAction<string>) => {
      state.update = { ...INIT_NOTE_UPDATE_STATE, error: payload };
    },

    clearNoteStateAction: (
      state,
      { payload }: PayloadAction<'create' | 'remove' | 'update'>
    ) => {
      (state[payload] as typeof state[typeof payload]) = INIT_NOTE_STATE[
        payload
      ];
    },
  },
});

/** NOTE ACTION CREATORS */
export const createNoteAction = createAction<
  CreateNoteActionType,
  typeof CREATE_NOTE
>(CREATE_NOTE, params => ({ payload: params }));

export const removeNoteAction = createAction<
  RemoveNoteActionType,
  typeof REMOVE_NOTE
>(REMOVE_NOTE, params => ({ payload: params }));

export const updateNoteAction = createAction<
  UpdateNoteActionType,
  typeof UPDATE_NOTE
>(UPDATE_NOTE, params => ({ payload: params }));

export const {
  clearNoteStateAction,
  createdNoteAction,
  createNoteErrorAction,
  creatingNoteAction,
  removedNoteAction,
  removeNoteErrorAction,
  removingNoteAction,
  updatedNoteAction,
  updateNoteErrorAction,
  updatingNoteAction,
} = noteSlice.actions;

/** NOTE REDUCER */
export const { reducer: noteReducer } = noteSlice;
