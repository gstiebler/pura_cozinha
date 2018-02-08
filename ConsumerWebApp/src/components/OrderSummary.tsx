import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { observer } from 'mobx-react';
import { Link } from 'mobx-router';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../lib/Utils';

const styles = theme => ({
  root: {
    padding: 16,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function OrderSummary(props: IProps) {
  const { store, classes } = props;

  const items = store.orderSummary.items.map(item => {
    return <span key={item.fmi._id}>{item.fmi.title}: {item.qty} * {formatCurrency(item.fmi.price)} = { formatCurrency(item.itemTotalPrice) }</span>;
  });

  return (
    <div className={classes.root}>
      { items }
      <br />
      Total: { formatCurrency(store.orderSummary.total) }
    </div>
  );
}

export default withStyles(styles)(observer(OrderSummary));
