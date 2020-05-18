import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: '-24px',
    marginTop: '-24px',
  },
});

const Loader = props => {
  const { classes } = props;
  return (
    <div className={classes.overlay}>
      <CircularProgress className={classes.loader} />
    </div>
  );
};

export default withStyles(styles)(Loader);
