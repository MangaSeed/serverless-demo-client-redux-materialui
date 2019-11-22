import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container } from '@material-ui/core';

import BillingForm from '../../components/BillingForm';

import config from '../../config/aws.config';

const Settings: FC<RouteComponentProps> = () => {
  return (
    <Container maxWidth="sm">
      <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm />
        </Elements>
      </StripeProvider>
    </Container>
  );
};

export default Settings;
