import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';


const styles = theme => ({
  root: {},
  image: {
    width: '100%'
  },
  internal: {
    padding: 16
  },
  description: {
    paddingTop: 8
  },
  price: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  icon: {
    margin: theme.spacing.unit,
  },
  quantity: {
    verticalAlign: 'center'
  },
  qtyContainer: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
    horizontalAlignment: 'center',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function ItemDetail(props: IProps) {
  const { store, classes } = props;
  const itemId = store.router.params.id;
  const foodMenuItem = store.getFoodMenuItem(itemId);
  const hiddenControllers = (store.getQuantityStockItemValue(foodMenuItem._id)) ? 'block' : 'none';
  const hiddenUnavailableItem = (store.getQuantityStockItemValue(foodMenuItem._id)) ? 'none' : 'block';

  const boolOptions = foodMenuItem.boolOptions.map(boolOption => {
    const label = `${boolOption.label} - ${formatCurrency(boolOption.price)}`;
    return (
      <Grid container spacing={24} style={{display: hiddenControllers}}>
        <Grid item xs>
          <Typography variant="body1" component="p" className={classes.price}>
            { label }
          </Typography>
        </Grid>
        <Grid item xs>
          <Switch
            checked={ store.getBoolOption(foodMenuItem._id, boolOption.key) }
            onChange={() => store.onBoolOptionSelected(foodMenuItem._id, boolOption.key)}
          />
        </Grid>
      </Grid>
    );
  });

  const multipleOptions = foodMenuItem.options.map(option => {
    const items = option.optionItems.map(optionItem => {
      const label = `${optionItem.label} - ${formatCurrency(optionItem.price)}`;
      return <FormControlLabel value={optionItem.key} control={<Radio />} label={label} key={optionItem.key}/>;
    });
    return (
      <FormControl component="fieldset" required className={classes.formControl} key={option.key} style={{display: hiddenControllers}}>
        <FormLabel component="legend">{ option.label }</FormLabel>
        <RadioGroup
          className={classes.group}
          value={ store.getMultipleOption(foodMenuItem._id, option.key) }
          onChange={(event:any) => store.onMenuItemOptionSelected(foodMenuItem._id, option.key, event.target.value)}
        >
          { items }
        </RadioGroup>
      </FormControl>
    );
  });
  return (
    <div className={classes.root}>
      <img src={foodMenuItem.imgURL} className={classes.image}/>
      <div className={classes.internal}>
        <Typography variant="headline" component="h2">
          { foodMenuItem.title }
        </Typography>
        <Typography variant="subheading" component="p" className={classes.description}>
          { foodMenuItem.description }
        </Typography>
        { multipleOptions }
        { boolOptions }
        <Typography variant="body1" component="p" className={classes.price}>
          { formatCurrency(foodMenuItem.price) }
        </Typography>
        <Divider />
        <Grid container className={classes.qtyContainer}>
          <Grid item xs={12} style={{display: hiddenControllers}}>
            <Grid container            
                alignItems="center"
                direction="row"
                justify='flex-start'  >
                <Grid item>
                  <Typography variant="subheading" gutterBottom>
                    Quantidade:
                  </Typography>
                </Grid>
                <Grid item>
                  <RemoveCircleOutline className={classes.icon} onClick={ () => store.onItemQtyDecreased(foodMenuItem._id) }/>
                </Grid>
                <Grid item>
                  <Typography className={classes.quantity} variant="body2">
                    { store.getItemQty(foodMenuItem._id) }
                  </Typography>
                </Grid>
                <Grid item>
                  <AddCircleOutline className={classes.icon} onClick={ () => store.onItemQtyIncreased(foodMenuItem._id) }/>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{display: hiddenUnavailableItem}}>
            <Grid container            
                alignItems="center"
                direction="row"
                justify='flex-start'  >
                <Grid item>
                  <Typography variant="subheading" gutterBottom>
                    Produto temporariamente indisponível.
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button variant="raised" className={classes.button} 
                onClick={ () => store.router.goTo(views.addressPayment, {}, store) } disabled={store.orderSummary.items.length === 0}>
          Finalizar pedido
        </Button>
        <Button variant="raised" className={classes.button} 
                onClick={ () => store.router.goTo(views.home, {}, store) } >
          Continuar comprando
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(observer(ItemDetail));
