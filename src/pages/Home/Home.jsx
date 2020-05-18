import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import AppNavBar from '../../components/AppNavBar/AppNavBar';
import AppDrawer from '../../components/AppDrawer/AppDrawer';
import { Paper, Typography } from '@material-ui/core';

import { openDrawer, closeDrawer } from '../../ducks/drawer/drawer';

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '30px 60px',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
  },
});

class Home extends React.Component {
  render() {
    const { classes, user } = this.props;
    return (
      <>
        <AppDrawer history={this.props.history} user={this.props.user} open={this.props.drawer} close={this.props.closeDrawer} />
        <AppNavBar title="Home" history={this.props.history} user={this.props.user} onMenu={this.props.openDrawer} />
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h3">
            Welcome {user.first_name}!
          </Typography>
          <Typography variant="subtitle1" component="p" style={{ marginTop: '10px' }}>
            This is a portal to manage gem inventory.
          </Typography>
        </Paper>
      </>
    );
  }
}

const stateToProps = state => ({
  drawer: state.drawer.open,
  user: state.auth.user,
});

const dispatchToProps = {
  openDrawer,
  closeDrawer,
};

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(styles)(Home));
