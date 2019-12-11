const dev = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: 'note-express-api-dev-attachmentsbucket-yfova31gwcwt',
    MAX_ATTACHMENT_SIZE: 5000000,
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://6djw95uco8.execute-api.ap-southeast-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_foRzF1e53',
    APP_CLIENT_ID: '39hn1k8bq0s0e3pel716j9j5r3',
    IDENTITY_POOL_ID: 'ap-southeast-1:2efbf2d5-6822-4149-a2e3-b6969616fa7b',
  },
  STRIPE_KEY: 'pk_test_iFjAjwyrcWGE3CzjzpivxUkB00wKBMxaCL',
};

const prod = {
  s3: {
    REGION: 'ap-southeast-1',
    BUCKET: 'note-express-api-dev-attachmentsbucket-yfova31gwcwt',
    MAX_ATTACHMENT_SIZE: 5000000,
  },
  apiGateway: {
    REGION: 'ap-southeast-1',
    URL: 'https://6djw95uco8.execute-api.ap-southeast-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_foRzF1e53',
    APP_CLIENT_ID: '39hn1k8bq0s0e3pel716j9j5r3',
    IDENTITY_POOL_ID: 'ap-southeast-1:2efbf2d5-6822-4149-a2e3-b6969616fa7b',
  },
  STRIPE_KEY: 'pk_test_iFjAjwyrcWGE3CzjzpivxUkB00wKBMxaCL',
};

// Default to dev if not set
const config = Cypress.env('stage') === 'prod' ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
