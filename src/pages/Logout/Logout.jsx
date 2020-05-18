import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';

import { logoutUser } from '../../ducks/auth/auth';

class Logout extends React.Component {
  componentDidMount() {
    this.props.logoutUser(this.props.history);
  }
  render() {
    return <Loader />;
  }
}

const stateToProps = state => ({
  user: state.auth.user,
});

const dispatchToProps = {
  logoutUser,
};

export default connect(
  stateToProps,
  dispatchToProps
)(Logout);
