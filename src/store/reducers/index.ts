import { combineReducers } from 'redux';

import { noteReducer } from './note';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
