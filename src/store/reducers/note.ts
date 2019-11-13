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

/** CONSTANTS */
const SLICE_NAME = 'note';

export const CREATE_TASK = `${SLICE_NAME}/createTaskAction`;

const INIT_NOTE_CREATE_STATE: INoteCreateState = {
  creating: false,
  created: false,
  error: '',
  data: null
};

const INIT_NOTE_STATE: INoteState = {
  create: INIT_NOTE_CREATE_STATE
};

/** SLICE CONFIG */
const noteSlice = createSlice({
  name: SLICE_NAME,
  initialState: INIT_NOTE_STATE,
  reducers: {
    creatingTaskAction: state => {
      state.create = { ...INIT_NOTE_CREATE_STATE, creating: true };
    },

    createdTaskAction: (state, { payload }: PayloadAction<INote>) => {
      state.create = {
        ...INIT_NOTE_CREATE_STATE,
        created: true,
        data: payload
      };
    },

    createTaskErrorAction: (state, { payload }: PayloadAction<string>) => {
      state.create = {
        ...INIT_NOTE_CREATE_STATE,
        error: payload
      };
    }
  }
});

/** ACTION CREATORS */
export const createNoteAction = createAction<string, typeof CREATE_TASK>(
  CREATE_TASK
);

export const {
  creatingTaskAction,
  createdTaskAction,
  createTaskErrorAction
} = noteSlice.actions;

/** REDUCER */
export const { reducer: noteReducer } = noteSlice;
