import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
// import views from '../model/Views';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Link } from 'mobx-router';


const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

interface IProps {
  store: Store;
  classes?: any;
}
@observer
class Navbar extends React.Component<IProps> {
  render() {
    const { classes, store } = this.props;
    return (
      <AppBar className={classes.root} position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit">
            Pura Cozinha
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const temp = (props: IProps) => <Navbar {...props} />;
export default observer(withStyles(styles)(temp));
