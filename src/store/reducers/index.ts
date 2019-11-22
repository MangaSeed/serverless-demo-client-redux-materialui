import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { billReducer } from './bill';
import { noteReducer } from './note';

export const rootReducer = combineReducers({
  auth: authReducer,
  bill: billReducer,
  note: noteReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
