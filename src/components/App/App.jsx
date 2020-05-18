import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getUser } from '../../ducks/auth/auth';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';

const styles = theme => ({
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: '-24px',
    marginTop: '-24px',
  },
});

class App extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { auth, classes } = this.props;
    return (
      <>
        {!auth.init_done && <CircularProgress className={classes.loader} />}
        {auth.init_done && (
          <Router>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/logout" component={Logout} />
          </Router>
        )}
      </>
    );
  }
}

const stateToProps = state => ({
  auth: state.auth,
});

const dispatchToProps = {
  getUser,
};

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(styles)(App));
