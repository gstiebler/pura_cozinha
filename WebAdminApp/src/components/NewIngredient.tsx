import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';
import { formatCurrency } from '../../../common/util';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

function handleClose(store: Store) {
  store.openDialogForm = !store.openDialogForm;
}

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function Ingredients(props: IProps) {
  const { store, classes } = props;
  
  return (
    <div className={classes.root}>
      <Dialog
          open={store.openDialogForm}
          onClose={handleClose.bind(null, store)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Novo Insumo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insira os dados para um novo insumo em seu estoque.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Nome"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Quantidade"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose.bind(null, store)} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose.bind(null, store)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default withStyles(styles)(observer(Ingredients));
