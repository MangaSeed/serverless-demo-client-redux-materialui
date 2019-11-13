import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export const signIn = async (
  email: string,
  password: string
): Promise<CognitoUser> => {
  return await Auth.signIn(email, password);
};

export const check = async (): Promise<CognitoUserSession> => {
  return await Auth.currentSession();
};

export const signOut = async () => {
  return await Auth.signOut();
};

export const signUp = async (email: string, password: string) => {
  return await Auth.signUp({
    password,
    username: email
  });
};

export const activate = async (email: string, code: string) => {
  return await Auth.confirmSignUp(email, code);
};
