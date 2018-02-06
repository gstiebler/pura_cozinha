import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { observer } from 'mobx-react';
import { Link } from 'mobx-router';
import views from '../Views';
import { Store } from '../model/Store';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    maxWidth: 40
  }
});

interface IProps {
  store: Store;
  classes?: any;
}

function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2)}`.replace('.', ',');
}
// 
function FoodMenu(props: IProps) {
  const { classes } = props;

  const items = props.store.foodMenuItems.map(fmi => {
    return (
      <ListItem key={fmi._id} button divider>
        <ListItemText primary={fmi.title} secondary={formatCurrency(fmi.price)}/>
        <img src={fmi.imgURL} className={classes.image}/>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <List>
        {items}
      </List>
    </div>
  );
}

export default withStyles(styles)(observer(FoodMenu));
