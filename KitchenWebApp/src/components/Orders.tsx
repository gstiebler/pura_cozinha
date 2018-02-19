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

function Orders(props: IProps) {
  const { classes, store } = this.props;

  return (
    <div />
  );
}

export default withStyles(styles)(observer(Orders));
