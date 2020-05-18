import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
  list: {
    width: 250,
  },
});

class AppDrawer extends React.Component {
  handleDrawerClick(link) {
    this.props.history.push(link);
  }

  closeDrawer(event) {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.props.close();
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer open={this.props.open} onClose={e => this.closeDrawer(e)}>
        <div className={classes.list} role="presentation" onClick={e => this.closeDrawer(e)} onKeyDown={e => this.closeDrawer(e)}>
          <List>
            <ListItem button onClick={() => this.handleDrawerClick('/')}>
              <ListItemAvatar>
                <Avatar>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AppDrawer);
