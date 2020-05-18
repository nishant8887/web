import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FormHelperText from '@material-ui/core/FormHelperText';
import FingerPrintIcon from '@material-ui/icons/FingerPrint';

import { login, loginError } from '../../ducks/login/login';

const styles = theme => ({
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(to bottom right, rgba(63, 81, 181, 0.3), rgba(255, 255, 255, 1))',
  },
  root: {
    left: 0,
    padding: 0,
    margin: 0,
    position: 'fixed',
    flexGrow: 1,
    top: '50%',
    width: '100%',
    transform: 'translateY(-50%)',
    boxSizing: 'border-box',
  },
  paper: {
    padding: 20,
    borderRadius: 8,
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
    },
  },
  textField: {
    display: 'block',
    width: '100%',
  },
  loginButton: {
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 32,
    color: '#3f51b5',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  signup: {
    padding: '17px 0px',
    '&:focus': {
      outline: 'none',
      textDecoration: 'underline',
    },
  },
});

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentWillMount() {
    this.props.loginError({});
  }

  loginClicked() {
    var errors = {};
    if (!this.state.email) {
      errors.email = 'Please enter a valid email';
    }
    if (!this.state.password) {
      errors.password = 'Password cannot be empty';
    }
    if (Object.keys(errors).length != 0) {
      this.props.loginError(errors);
      return;
    }
    this.props.login({ history: this.props.history, email: this.state.email, password: this.state.password });
  }

  handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      this.loginClicked();
      ev.preventDefault();
    }
  }

  render() {
    const { user, busy, errors, classes } = this.props;
    if (user) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: '/login' },
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <div className={classes.background} />
        <div className={classes.root}>
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper className={classes.paper}>
                <div className={classes.title}>
                  <FingerPrintIcon className={classes.icon} />
                  <Typography variant="h5" gutterBottom>
                    Sign in
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Continue to the management portal
                  </Typography>
                </div>
                <TextField
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  margin="normal"
                  variant="outlined"
                  error={errors.email !== undefined}
                  helperText={errors.email ? errors.email : ''}
                  onChange={e => {
                    this.setState({ email: e.target.value.trim() });
                  }}
                  fullWidth
                />
                <TextField
                  label="Password"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  error={errors.password !== undefined}
                  helperText={errors.password ? errors.password : ''}
                  onChange={e => {
                    this.setState({ password: e.target.value.trim() });
                  }}
                  fullWidth
                  onKeyPress={ev => this.handleKeyPress(ev)}
                />
                {errors.common && <FormHelperText error>{errors.common}</FormHelperText>}
                <div className={classes.buttonContainer}>
                  <Button
                    disabled={busy}
                    variant="outlined"
                    size="large"
                    color="primary"
                    className={classes.loginButton}
                    onClick={() => this.loginClicked()}
                  >
                    Log In
                  </Button>
                  {!busy && (
                    <Link className={classes.signup} component={RouterLink} variant="body1" to="/signup">
                      Create new account
                    </Link>
                  )}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const stateToProps = state => ({
  user: state.auth.user,
  busy: state.login.busy,
  errors: state.login.errors,
});

const dispatchToProps = {
  login,
  loginError,
};

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(styles)(Login));
