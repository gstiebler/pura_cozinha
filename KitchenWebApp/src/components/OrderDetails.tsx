import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import Typography from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import * as moment from 'moment';

const styles = {
  root: {
    padding: 16,
    margin: 8,
  }
};

interface IProps {
  store: Store;
  classes?: any;
}

function OrderDetails(props: IProps) {
  const { classes, store } = props;
  const order = store.currentOrder;
  if (!order) {
    return <div />;
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography component="p">
          Status: {order.readableStatus}
        </Typography>
        <Typography component="p">
          Local: {order.local}
        </Typography>
        <Typography component="p">
          Complemento: {order.localComplement}
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(observer(OrderDetails));
