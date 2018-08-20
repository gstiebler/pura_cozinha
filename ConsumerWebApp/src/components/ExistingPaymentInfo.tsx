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

const styles = theme => ({
  root: {
    padding: '0' + (theme.spacing.unit * 3) + 'px'
  },
  wrapper: {
    maxWidth: 400,
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function ExistingPaymentInfo(props: IProps) {
  const { store, classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item>
              <Avatar className={classes.button}>
                <PriorityHigh/>
              </Avatar>
              </Grid>
              <Grid item xs>
                <Typography>Esta cozinha encontra-se temporariamente fechada. Tente novamente mais tarde.</Typography>
              </Grid>
            </Grid>
          </Paper>
      </div>
    </div>
  );

}

export default withStyles(styles)(observer(ExistingPaymentInfo));
