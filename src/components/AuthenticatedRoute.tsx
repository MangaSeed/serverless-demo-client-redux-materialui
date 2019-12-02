import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRouteProps } from '../Routes';

const AuthenticatedRoute: FC<IRouteProps> = ({
  component: C,
  appProps,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.checkedAuth && C ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/signin?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
