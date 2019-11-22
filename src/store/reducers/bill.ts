import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

import { ReactStripeElements } from 'react-stripe-elements';

/** BILL INTERFACES */
interface IBillState {
  saving: boolean;
  saved: boolean;
  error: string;
}

export interface ISaveBillPayload {
  name: string;
  storage: number;
  stripe: ReactStripeElements.StripeProps;
}

/** BILL CONSTANTS */
export const SAVE_BILL = 'bill/saveBillAction';

const INIT_BILL_STATE: IBillState = {
  saving: false,
  saved: false,
  error: '',
};

/** BILL SLICE */
const billSlice = createSlice({
  name: 'bill',
  initialState: INIT_BILL_STATE,
  reducers: {
    savingBillAction: state => {
      state = { ...INIT_BILL_STATE, saving: true };
      return state;
    },

    savedBillAction: state => {
      state = { ...INIT_BILL_STATE, saved: true };
      return state;
    },

    saveBillErrorAction: (state, { payload }: PayloadAction<string>) => {
      state = { ...INIT_BILL_STATE, error: payload };
      return state;
    },

    resetBillAction: () => INIT_BILL_STATE,
  },
});

/** BILL ACTIONS */
export const saveBillAction = createAction<ISaveBillPayload, typeof SAVE_BILL>(
  SAVE_BILL
);

export const {
  saveBillErrorAction,
  savedBillAction,
  savingBillAction,
  resetBillAction,
} = billSlice.actions;

/** BILL REDUCER */
export const { reducer: billReducer } = billSlice;
