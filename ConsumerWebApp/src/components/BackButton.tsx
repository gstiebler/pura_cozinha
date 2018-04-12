import * as React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../model/Store';
// import views from '../model/Views';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { withStyles } from 'material-ui/styles';
import { Link } from 'mobx-router';
import views from '../Views';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

interface IProps {
  store: Store;
  classes?: any;
}
@observer
class BackButton extends React.Component<IProps> {
    render() {
        const { classes, store } = this.props;
        return (
            <IconButton className={classes.button} style={{display: store.isBackButtonVisible()}}
                onClick={ () => store.router.goTo(views.home, {}, store) }>
                <KeyboardArrowLeft />
            </IconButton>
        );
    }
}

const temp = (props: IProps) => <BackButton {...props} />;
export default observer(withStyles(styles)(temp));
