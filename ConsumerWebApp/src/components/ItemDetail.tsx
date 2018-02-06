import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import { observer } from 'mobx-react';
import { Link } from 'mobx-router';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../lib/Utils';

const styles = theme => ({
  root: {}
});

interface IProps {
  store: Store;
  classes?: any;
}

function ItemDetail(props: IProps) {
  const { store, classes } = props;
  const itemId = store.router.params.id;
  const foodMenuItem = store.getFoodMenuItem(itemId);

  return (
    <div className={classes.root}>
      { foodMenuItem.title }
    </div>
  );
}

export default withStyles(styles)(observer(ItemDetail));
