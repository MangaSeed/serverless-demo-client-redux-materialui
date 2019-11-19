import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Container } from '@material-ui/core';

import {
  signInAuthAction,
  resetAuthInnerStateAction,
  checkedAuthAction
} from '../../store/reducers/auth';

import {
  selectAuthSigningIn,
  selectAuthSignedIn,
  selectAuthSignInError
} from '../../store/selectors/auth';

import LoaderButton from '../../components/LoaderButton';

import { useFormFields } from '../../libs/hooksLib';

const Signin = () => {
  const dispatch = useDispatch();

  const signingIn = useSelector(selectAuthSigningIn);
  const signedIn = useSelector(selectAuthSignedIn);
  const signInError = useSelector(selectAuthSignInError);

  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (signInError) alert(signInError);

    if (signedIn) {
      dispatch(checkedAuthAction(true));
      dispatch(resetAuthInnerStateAction('signin'));
    }
  }, [signInError, signedIn, dispatch]);

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signInAuthAction(fields.email, fields.password));
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          margin="normal"
          name="email"
          type="email"
          variant="outlined"
          value={fields.email}
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
          value={fields.password}
          onChange={handleFieldChange}
          fullWidth
        />
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={signingIn}
          disabled={!validateForm()}
          id="signin-button"
          fullWidth
        >
          Sign in
        </LoaderButton>
      </form>
    </Container>
  );
};

export default Signin;
