// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import Amplify, { Auth, API, Storage } from 'aws-amplify';

import 'cypress-file-upload';
import '@testing-library/cypress/add-commands';

import config from './config/aws.config';

const ENDPOINT = 'notes';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: ENDPOINT,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

Cypress.Commands.add('signIn', (mail, pass) => {
  return Auth.signIn(mail, pass);
});

Cypress.Commands.add('checkAuth', async () => {
  try {
    const data = await Auth.currentSession();
    return data;
  } catch (err) {
    return err.message || err;
  }
});

Cypress.Commands.add('removeNote', async (id, fileName) => {
  if (fileName) await Storage.vault.remove(fileName);
  await API.del(ENDPOINT, `/notes/${id}`, null);
});
