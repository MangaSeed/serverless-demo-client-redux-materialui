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

interface INoteState {
  create: INoteCreateState;
}

export interface ICreateNotePayload {
  content: string;
  attachment?: File;
}

interface ICreateNoteAction {
  payload: ICreateNotePayload;
}

/** NOTE ACTION TYPES */

type CreateNoteActionType = (params: ICreateNotePayload) => ICreateNoteAction;

/** NOTE CONSTANTS */
export const CREATE_NOTE = `note/createNoteAction`;

const INIT_NOTE_CREATE_STATE: INoteCreateState = {
  creating: false,
  created: false,
  error: '',
  data: null
};

const INIT_NOTE_STATE: INoteState = {
  create: INIT_NOTE_CREATE_STATE
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
        data: payload
      };
    },

    createNoteErrorAction: (state, { payload }: PayloadAction<string>) => {
      state.create = {
        ...INIT_NOTE_CREATE_STATE,
        error: payload
      };
    },

    clearNoteStateAction: (state, { payload }: PayloadAction<'create'>) => {
      state[payload] = INIT_NOTE_STATE[payload];
    }
  }
});

/** NOTE ACTION CREATORS */
export const createNoteAction = createAction<
  CreateNoteActionType,
  typeof CREATE_NOTE
>(CREATE_NOTE, params => ({ payload: params }));

export const {
  creatingNoteAction,
  createdNoteAction,
  createNoteErrorAction,
  clearNoteStateAction
} = noteSlice.actions;

/** NOTE REDUCER */
export const { reducer: noteReducer } = noteSlice;
