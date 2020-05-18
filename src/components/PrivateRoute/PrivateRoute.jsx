import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, admin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.user !== undefined && (!admin || auth.user.is_admin) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const stateToProps = state => ({
  auth: state.auth,
});

const dispatchToProps = {};

export default connect(
  stateToProps,
  dispatchToProps
)(PrivateRoute);
