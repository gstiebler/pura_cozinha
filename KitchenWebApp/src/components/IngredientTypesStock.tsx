import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import { availableUnits, readableUnits } from '../../../common/statuesesMaps';


function handleClick(store: Store, id: string, event) {
  store.setCurrentIngredientType(id);
  store.anchorEL = event.currentTarget;
}

function handleClose(store: Store) {
  store.anchorEL = null;
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


function IngredientTypesStock(props: IProps) {
  const { store, classes } = props;
  const items = store.ingredientTypes.map(fmi =>{ 
    const ingredientTypeAmount = store.getIngredientTypeAmountInList(fmi._id);
    const ITEM_HEIGHT = 25;
    const primary = fmi.title;
    const secondary = `${ ((!!ingredientTypeAmount) ? ingredientTypeAmount.total : 0)} 
                        ${readableUnits.get(fmi.unit)}`;
    return (
      <ListItem key={fmi._id} divider >
        <ListItemText primary={primary} secondary={secondary}/>
        <IconButton
          aria-label="More"
          aria-owns={store.anchorEL ? 'long-menu' : null}
          aria-haspopup="true"
          key={fmi._id}
          onClick={handleClick.bind(null, store, fmi._id)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={store.anchorEL}
          open={Boolean(store.anchorEL)}
          onClose={handleClose.bind(null, store)}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 80,
            },
          }}
        >
          <MenuItem key='delete'>
              Editar
          </MenuItem>
        </Menu>
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
