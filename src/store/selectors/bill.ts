import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../reducers';

export const selectBill = (state: AppState) => state.bill;
export const selectBillSaving = createSelector(selectBill, bill => bill.saving);
export const selectBillSaved = createSelector(selectBill, bill => bill.saved);
export const selectBillSaveError = createSelector(
  selectBill,
  bill => bill.error
);
