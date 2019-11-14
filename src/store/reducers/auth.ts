import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

/** AUTH INTERFACES */
interface IAuthActivateState {
  activated: boolean;
  activating: boolean;
  error: string;
}

interface IAuthLoginState {
  loggedIn: boolean;
  loggingIn: boolean;
  error: string;
}

interface IAuthLogoutState {
  loggedOut: boolean;
  loggingOut: boolean;
  error: string;
}

interface IAuthSignUpState {
  signedUp: boolean;
  signingUp: boolean;
  error: string;
}

interface IAuthState {
  activate: IAuthActivateState;
  login: IAuthLoginState;
  logout: IAuthLogoutState;
  signup: IAuthSignUpState;
}

/** AUTH ACTION TYPES */
export const ACTIVATE_AUTH = 'auth/activateAuthAction';
export const LOGIN_AUTH = 'auth/logInAuthAction';
export const LOGOUT_AUTH = 'auth/logOutAuthAction';
export const SIGNUP_AUTH = 'auth/signUpAuthAction';

/** AUTH INITIAL STATES */
const INIT_AUTH_ACTIVATE_STATE: IAuthActivateState = {
  activated: false,
  activating: false,
  error: ''
};

const INIT_AUTH_LOGIN_STATE: IAuthLoginState = {
  loggedIn: false,
  loggingIn: false,
  error: ''
};

const INIT_AUTH_LOGOUT_STATE: IAuthLogoutState = {
  loggedOut: false,
  loggingOut: false,
  error: ''
};

const INIT_AUTH_SIGNUP_STATE: IAuthSignUpState = {
  signedUp: false,
  signingUp: false,
  error: ''
};

const INIT_AUTH_STATE: IAuthState = {
  activate: INIT_AUTH_ACTIVATE_STATE,
  login: INIT_AUTH_LOGIN_STATE,
  logout: INIT_AUTH_LOGOUT_STATE,
  signup: INIT_AUTH_SIGNUP_STATE
};

/** AUTH SLICE */
const authSlice = createSlice({
  name: 'auth',
  initialState: INIT_AUTH_STATE,
  reducers: {
    activatingAuthAction: state => {
      state.activate = { ...INIT_AUTH_ACTIVATE_STATE, activating: true };
    },

    activatedAuthAction: state => {
      state.activate = { ...INIT_AUTH_ACTIVATE_STATE, activated: true };
    },

    activateErrorAuthAction: (state, { payload }: PayloadAction<string>) => {
      state.activate = { ...INIT_AUTH_ACTIVATE_STATE, error: payload };
    },

    loggingInAuthAction: state => {
      state.login = { ...INIT_AUTH_LOGIN_STATE, loggingIn: true };
    },

    loggedInAuthAction: state => {
      state.login = { ...INIT_AUTH_LOGIN_STATE, loggedIn: true };
    },

    logInErrorAuthAction: (state, { payload }: PayloadAction<string>) => {
      state.login = { ...INIT_AUTH_LOGIN_STATE, error: payload };
    },

    loggingOutAuthAction: state => {
      state.logout = { ...INIT_AUTH_LOGOUT_STATE, loggingOut: true };
    },

    loggedOutAuthAction: state => {
      state.logout = { ...INIT_AUTH_LOGOUT_STATE, loggedOut: true };
    },

    logOutErrorAuthAction: (state, { payload }: PayloadAction<string>) => {
      state.logout = { ...INIT_AUTH_LOGOUT_STATE, error: payload };
    },

    signingUpAuthAction: state => {
      state.signup = { ...INIT_AUTH_SIGNUP_STATE, signingUp: true };
    },

    signedUpAuthAction: state => {
      state.signup = { ...INIT_AUTH_SIGNUP_STATE, signedUp: true };
    },

    signUpErrorAuthAction: (state, { payload }: PayloadAction<string>) => {
      state.signup = { ...INIT_AUTH_SIGNUP_STATE, error: payload };
    },

    resetAuthInnerStateAction: (
      state,
      { payload }: PayloadAction<'activate' | 'login' | 'logout' | 'signup'>
    ) => {
      // !IMPORTANT: tried this, weirdly enough typescript is not permitting it
      // state[payload] = INIT_AUTH_STATE[payload];

      switch (payload) {
        case 'activate':
          state[payload] = INIT_AUTH_STATE[payload];
          break;

        case 'login':
          state[payload] = INIT_AUTH_STATE[payload];
          break;

        case 'logout':
          state[payload] = INIT_AUTH_STATE[payload];
          break;

        case 'signup':
          state[payload] = INIT_AUTH_STATE[payload];
          break;

        default:
          state = INIT_AUTH_STATE;
          break;
      }
    }
  }
});

/** AUTH ACTIONS */
export const activateAuthAction = createAction(
  ACTIVATE_AUTH,
  (email: string, code: string) => ({ payload: { email, code } })
);

export const logInAuthAction = createAction(
  LOGIN_AUTH,
  (email: string, password: string) => ({
    payload: { email, password }
  })
);

export const logOutAuthAction = createAction(LOGOUT_AUTH);

export const signUnAuthAction = createAction(
  SIGNUP_AUTH,
  (email: string, password: string) => ({
    payload: { email, password }
  })
);

export const {
  activatingAuthAction,
  activatedAuthAction,
  activateErrorAuthAction,
  loggingInAuthAction,
  loggedInAuthAction,
  logInErrorAuthAction,
  loggingOutAuthAction,
  loggedOutAuthAction,
  logOutErrorAuthAction,
  signingUpAuthAction,
  signedUpAuthAction,
  signUpErrorAuthAction,
  resetAuthInnerStateAction
} = authSlice.actions;

/** AUTH REDUCER */
export const { reducer: authReducer } = authSlice;
