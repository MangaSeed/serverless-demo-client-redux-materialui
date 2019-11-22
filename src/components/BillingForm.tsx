import React, { useState, FormEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from 'react-stripe-elements';
import { TextField, Divider } from '@material-ui/core';

import { saveBillAction, resetBillAction } from '../store/reducers/bill';

import {
  selectBillSaving,
  selectBillSaveError,
  selectBillSaved,
} from '../store/selectors/bill';

import LoaderButton from './LoaderButton';
import StripeInput from './StripeInput';

import { useFormFields } from '../libs/hooksLib';

const BillingForm: FC<ReactStripeElements.InjectedStripeProps> = ({
  stripe,
}) => {
  const dispatch = useDispatch();
  const { push: historyPush } = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: '',
  });

  const { storage, name } = fields;

  const saving = useSelector(selectBillSaving);
  const saved = useSelector(selectBillSaved);
  const error = useSelector(selectBillSaveError);

  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardError, setCardError] = useState('');

  useEffect(() => {
    if (saved) {
      historyPush('/');
      dispatch(resetBillAction());
    }
  }, [saved, dispatch, historyPush]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const validateForm = () => name !== '' && storage !== '' && isCardComplete;

  const handleCardChange = ({
    complete,
    error,
  }: ReactStripeElements.ElementChangeResponse) => {
    if (error && error.message) {
      setCardError(error.message);
      setIsCardComplete(false);
    } else {
      setCardError('');
      setIsCardComplete(complete);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe) return;

    dispatch(
      saveBillAction({
        name,
        stripe,
        storage: Number(storage),
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Storage"
        placeholder="Number of storage"
        variant="outlined"
        name="storage"
        id="storage"
        type="number"
        margin="normal"
        value={fields.storage}
        onChange={handleFieldChange}
        required
        fullWidth
      />
      <Divider />
      <TextField
        label="Cardholder's name"
        placeholder="Name of recipient on the given card"
        variant="outlined"
        name="name"
        id="name"
        margin="normal"
        value={fields.name}
        onChange={handleFieldChange}
        required
        fullWidth
      />
      <TextField
        id="card"
        margin="normal"
        label="Credit/Debit card information"
        variant="outlined"
        error={Boolean(cardError)}
        helperText={cardError ? cardError || 'Invalid' : ''}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputProps: { component: CardElement, handleCardChange },
          inputComponent: StripeInput,
        }}
        fullWidth
      />
      <LoaderButton
        id="saveBillButton"
        type="submit"
        variant="contained"
        color="primary"
        isLoading={saving}
        disabled={!validateForm()}
        fullWidth
      >
        Purchase
      </LoaderButton>
    </form>
  );
};

export default injectStripe(BillingForm);
