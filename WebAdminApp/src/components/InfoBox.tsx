import * as React from 'react';
import Paper from 'material-ui/Paper';
// import {white, grey800} from 'material-ui/colors';
import { Store } from '../model/Store';
import { withStyles, Grid } from "material-ui";
import { observer } from 'mobx-react';


const styles = theme => ({
  content: {
    padding: '5px 10px',
    marginLeft: 90,
    height: 80
  },
  number: {
    display: 'block',
    fontSize: 18,
    color: '#FAFAFA'
  },
  text: {
    fontSize: 20,
    color: '#FAFAFA'
  },
  iconSpan: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: '#2196F3'
  },
  icon: {
    height: 48,
    width: 48,
    marginTop: 20,
    maxWidth: '100%'

  }
});

interface IProps {
  store: Store;
  classes?: any;
  color?: any;
  title?: any;
  value?: any;
  Icon?: any;
}

function InfoBox(props: IProps) {
  const { classes, store } = props;
  const {color, title, value, Icon} = this.props;
  return (
    <div>
      <Paper>
        <span className={classes.iconSpan}>
          <Icon color='#FAFAFA'
            className={classes.icon}
          />
        </span>

        <div className={classes.content}>
          <span className={classes.text}>{title}</span>
          <span className={classes.number}>{value}</span>
        </div>
      </Paper>
    </div>
  );
}


export default withStyles(styles, { withTheme: true })(observer(InfoBox));