import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import { availableUnits, readableUnits } from '../../../common/statuesesMaps';

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


function IngredientTypesStock(props: IProps) {
  const { store, classes } = props;
  const items = store.ingredientTypesStock.map(fmi =>{ 
    const ingredientType = store.getIngredientTypeInList(fmi._id);
    const primary = ingredientType.title;
    const secondary = `${fmi.total} ${readableUnits.get(ingredientType.unit)}`;
    return (
      <ListItem key={fmi._id} divider >
        <ListItemText primary={primary} secondary={secondary}/>
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <Typography variant="subheading" gutterBottom className={classes.summaryLabel}>
        Estoque de tipos de insumo
      </Typography>
      <List>
        {items}
      </List>
    </div>
  );
}

export default withStyles(styles)(observer(IngredientTypesStock));
