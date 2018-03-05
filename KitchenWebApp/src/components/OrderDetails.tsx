import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
import Typography from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { formatCurrency } from '../../../common/util';
import * as moment from 'moment';

const styles = {
  root: {}
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
    <div className={classes.root}>
      <Typography>
        Status: {order.readableStatus}
      </Typography>
      <Typography>
        Local: {order.local}
      </Typography>
      <Typography>
        Complemento: {order.localComplement}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(observer(OrderDetails));
