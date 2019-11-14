import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

/** AUTH INTERFACES */
interface IAuthActivateState {
  activated: boolean;
  activating: boolean;
  error: string;
}

interface IAuthSignInState {
  signedIn: boolean;
  signingIn: boolean;
  error: string;
}

interface IAuthSignOutState {
  signedOut: boolean;
  signingOut: boolean;
  error: string;
}

interface IAuthSignUpState {
  signedUp: boolean;
  signingUp: boolean;
  error: string;
}

interface IAuthState {
  activate: IAuthActivateState;
  signin: IAuthSignInState;
  signout: IAuthSignOutState;
  signup: IAuthSignUpState;
}

/** AUTH ACTION TYPES */
export const ACTIVATE_AUTH = 'auth/activateAuthAction';
export const SIGNIN_AUTH = 'auth/signInAuthAction';
export const SIGNOUT_AUTH = 'auth/signOutAuthAction';
export const SIGNUP_AUTH = 'auth/signUpAuthAction';

/** AUTH INITIAL STATES */
const INIT_AUTH_ACTIVATE_STATE: IAuthActivateState = {
  activated: false,
  activating: false,
  error: ''
};

const INIT_AUTH_SIGNIN_STATE: IAuthSignInState = {
  signedIn: false,
  signingIn: false,
  error: ''
};

const INIT_AUTH_SIGNOUT_STATE: IAuthSignOutState = {
  signedOut: false,
  signingOut: false,
  error: ''
};

const INIT_AUTH_SIGNUP_STATE: IAuthSignUpState = {
  signedUp: false,
  signingUp: false,
  error: ''
};

const INIT_AUTH_STATE: IAuthState = {
  activate: INIT_AUTH_ACTIVATE_STATE,
  signin: INIT_AUTH_SIGNIN_STATE,
  signout: INIT_AUTH_SIGNOUT_STATE,
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

    signingInAuthAction: state => {
      state.signin = { ...INIT_AUTH_SIGNIN_STATE, signingIn: true };
    },

    signedInAuthAction: state => {
      state.signin = { ...INIT_AUTH_SIGNIN_STATE, signedIn: true };
    },

    signInErrorAuthAction: (state, { payload }: PayloadAction<string>) => {
      state.signin = { ...INIT_AUTH_SIGNIN_STATE, error: payload };
    },

    signingOutAuthAction: state => {
      state.signout = { ...INIT_AUTH_SIGNOUT_STATE, signingOut: true };
    },

    signedOutAuthAction: state => {
      state.signout = { ...INIT_AUTH_SIGNOUT_STATE, signedOut: true };
    },

    signOutErrorAuthAction: (state, { payload }: PayloadAction<string>) => {
      state.signout = { ...INIT_AUTH_SIGNOUT_STATE, error: payload };
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
      { payload }: PayloadAction<'activate' | 'signin' | 'signout' | 'signup'>
    ) => {
      // !IMPORTANT: tried this, weirdly enough typescript is not permitting it
      // state[payload] = INIT_AUTH_STATE[payload];

      switch (payload) {
        case 'activate':
          state[payload] = INIT_AUTH_STATE[payload];
          break;

        case 'signin':
          state[payload] = INIT_AUTH_STATE[payload];
          break;

        case 'signout':
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

export const signInAuthAction = createAction(
  SIGNIN_AUTH,
  (email: string, password: string) => ({
    payload: { email, password }
  })
);

export const signOutAuthAction = createAction(SIGNOUT_AUTH);

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
  signingInAuthAction,
  signedInAuthAction,
  signInErrorAuthAction,
  signingOutAuthAction,
  signedOutAuthAction,
  signOutErrorAuthAction,
  signingUpAuthAction,
  signedUpAuthAction,
  signUpErrorAuthAction,
  resetAuthInnerStateAction
} = authSlice.actions;

/** AUTH REDUCER */
export const { reducer: authReducer } = authSlice;
