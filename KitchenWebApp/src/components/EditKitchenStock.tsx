import * as React from "react";
import { withStyles } from "material-ui/styles";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import Typography from 'material-ui/Typography';
import { observer } from "mobx-react";
import views from "../Views";
import { Store } from "../model/Store";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import TextField from "material-ui/TextField";

function handleClose(store: Store) {
  store.openDialogForm = !store.openDialogForm;
}

function onQuantityChanged(store: Store, event) {
  store.onKitchenStockQtyChanged(event.target.value);
}

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    marginTop: theme.spacing.unit,
    width: "100%"
  },
  qtyContainer: {
    flexGrow: 1,
    marginTop: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit,
    horizontalAlignment: "center"
  }
});

interface IProps {
  store: Store;
  classes?: any;
}

function EditKitchenStock(props: IProps) {
  const { store, classes } = props;

  return (
    <div className={classes.root}>
      <Dialog
        open={store.openDialogForm}
        onClose={handleClose.bind(null, store)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Editar Quantidade em Estoque
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="subheading"
            gutterBottom
            className={classes.summaryLabel}
          >
            {store.currentIngredientType.title}
          </Typography>
          <br />
          <TextField
            id="qty"
            label="Quantidade"
            value={store.stockQty}
            className={classes.formControl}
            onChange={onQuantityChanged.bind(null, store)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose.bind(null, store)} color="primary">
            Cancelar
          </Button>
          <Button color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(observer(EditKitchenStock));
