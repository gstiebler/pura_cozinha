import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';

const styles = theme => ({
  root: {
    paddingLeft: 16,
  },
  itemLine: {
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
    horizontalAlignment: 'center',
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function OrderSummary(props: IProps) {
  const { store, classes } = props;

  const items = store.orderSummary.items.map(item => {
    return (
      <div key={item.fmi._id} className={classes.itemLine}>
        <Typography gutterBottom >
          {item.fmi.title} ({item.qty}): { formatCurrency(item.itemTotalPrice) }
        </Typography>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      { items }
      <br />
      <Typography gutterBottom >
        Total: { formatCurrency(store.orderSummary.totalAmount) }
      </Typography>
    </div>
  );
}

export default withStyles(styles)(observer(OrderSummary));
