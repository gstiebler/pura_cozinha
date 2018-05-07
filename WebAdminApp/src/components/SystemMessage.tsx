import Snackbar from 'material-ui/Snackbar';
import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import { withStyles } from 'material-ui/styles';


const styles = {
};

interface IProps {
  store: Store;
  classes?: any;
}

function SystemMessage(props: IProps) {
  const { classes, store } = this.props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={store.isSnackbarOpen}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{ store.snackbarMsg }</span>}
    />
  );
}

export default withStyles(styles)(observer(SystemMessage));
