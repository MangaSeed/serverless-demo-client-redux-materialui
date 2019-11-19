import React, { FormEvent, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { TextField, Container } from '@material-ui/core';

import {
  signUpAuthAction,
  activateAuthAction,
  signInAuthAction,
  checkedAuthAction,
  resetAuthInnerStateAction
} from '../../store/reducers/auth';

import {
  selectAuthSigningUp,
  selectAuthSignedUp,
  selectAuthSignUpError,
  selectAuthActivating,
  selectAuthActivated,
  selectAuthActivateError,
  selectAuthSigningIn,
  selectAuthSignedIn,
  selectAuthSignInError
} from '../../store/selectors/auth';

import LoaderButton from '../../components/LoaderButton';

import { useFormFields } from '../../libs/hooksLib';

interface IFormFields {
  email: string;
  password: string;
  confirmPassword: string;
  confirmationCode: string;
}

const INITIAL_FORM_FIELDS: IFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
  confirmationCode: ''
};

const Signup: FC<RouteComponentProps> = ({ history }) => {
  const { push: historyPush } = history;
  const dispatch = useDispatch();

  const signingUp = useSelector(selectAuthSigningUp);
  const signedUp = useSelector(selectAuthSignedUp);
  const signUpError = useSelector(selectAuthSignUpError);

  const activating = useSelector(selectAuthActivating);
  const activated = useSelector(selectAuthActivated);
  const activateError = useSelector(selectAuthActivateError);

  const signingIn = useSelector(selectAuthSigningIn);
  const signedIn = useSelector(selectAuthSignedIn);
  const signInError = useSelector(selectAuthSignInError);

  const [fields, handleFieldChange] = useFormFields<IFormFields>(
    INITIAL_FORM_FIELDS
  );

  const { email, password } = fields;

  useEffect(() => {
    if (signUpError) alert(signUpError);
    if (activateError) alert(activateError);
    if (signInError) alert(signInError);
  }, [signUpError, activateError, signInError]);

  useEffect(() => {
    if (activated) dispatch(signInAuthAction(email, password));
    if (signedIn) {
      dispatch(checkedAuthAction(true));
      dispatch(resetAuthInnerStateAction('signin'));
      dispatch(resetAuthInnerStateAction('signup'));
      dispatch(resetAuthInnerStateAction('activate'));
      historyPush('/');
    }
  }, [activated, signedIn, historyPush, dispatch, email, password]);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(signUpAuthAction(email, password));
  }

  function handleConfirmationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(activateAuthAction(email, fields.confirmationCode));
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <TextField
          id="confirmation-code"
          label="Confirmation code"
          margin="normal"
          name="confirmationCode"
          type="tel"
          variant="outlined"
          onChange={handleFieldChange}
          value={fields.confirmationCode}
          helperText="Please check your email for the code."
          autoFocus
          fullWidth
        />
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={activating || signingIn}
          disabled={!validateConfirmationForm()}
          fullWidth
          id="verify-button"
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          margin="normal"
          name="email"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          margin="normal"
          name="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          id="confirm-password"
          label="Confirm password"
          margin="normal"
          name="confirmPassword"
          type="password"
          variant="outlined"
          onChange={handleFieldChange}
          value={fields.confirmPassword}
          fullWidth
        />
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={signingUp}
          disabled={!validateForm()}
          id="signup-button"
          fullWidth
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <Container maxWidth="sm">
      {!signedUp ? renderForm() : renderConfirmationForm()}
    </Container>
  );
};

export default Signup;
