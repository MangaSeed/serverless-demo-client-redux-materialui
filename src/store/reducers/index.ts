import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { noteReducer } from './note';

export const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer
});

export type AppState = ReturnType<typeof rootReducer>;
