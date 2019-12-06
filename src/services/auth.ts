import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

export async function signIn(
  email: string,
  password: string
): Promise<CognitoUser> {
  return await Auth.signIn(email, password);
}

export async function check() {
  return await Auth.currentSession();
}

export async function signOut() {
  return await Auth.signOut();
}

export async function signUp(email: string, password: string) {
  return await Auth.signUp({
    password,
    username: email,
  });
}

export const activate = async (email: string, code: string) => {
  return await Auth.confirmSignUp(email, code);
};
