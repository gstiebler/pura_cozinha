import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import OrderSummary from './OrderSummary';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import PriorityHigh from 'material-ui-icons/PriorityHigh';



function onItemClicked(store: Store, id: string) {
  store.router.goTo(views.itemDetail, { id }, store);
}

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    maxWidth: 40
  },
  button: {
    margin: theme.spacing.unit,
    horizontalAlignment: 'center',
  },
  summaryLabel: {
    padding: 16,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function KitchenWarning(props: IProps) {
  const { store, classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Avatar>
              <PriorityHigh/>
            </Avatar>
            <Typography >
                Esta cozinha encontra-se temporariamente fechada. Tente novamente mais tarde.
              </Typography>
          </Grid>
        </Paper>
      </div>
    </div>
  );

}

export default withStyles(styles)(observer(KitchenWarning));
