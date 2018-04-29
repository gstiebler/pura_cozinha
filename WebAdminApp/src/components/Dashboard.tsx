import * as React from 'react';
import { Store } from '../model/Store';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import { withStyles, Grid } from "material-ui";
import { observer } from 'mobx-react';
import InfoBox from './InfoBox';
// import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

const styles = theme => ({
  
});

interface IProps {
  store: Store;
  classes?: any;
}

function Dashboard(props: IProps){
  const { classes, store } = props;
  return (
    <div>
      <Grid container>

        <Grid item xs={12} sm={6} md={3}>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox Icon={}
                    color='#2196F3'
                    title="Total Profit"
                    value="1500k"
                    store={store}
            />
          </div>
        </Grid>
        
      </Grid>
      <Grid container>
        
      </Grid>
      <Grid container>
        
      </Grid>
    </div>
  );
}


export default withStyles(styles, { withTheme: true })(observer(Dashboard));