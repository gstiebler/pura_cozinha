import * as React from 'react';
import { View } from 'react-native';
import FoodMenuItemComponent from '../components/FoodMenuItemComponent';
import { model } from '../Startup';
import { foodMenuItemFlowControl } from '../FlowControl';

interface IAppProps {
  menuItemId: string;
}

interface IAppState {
  menuItem: any;
  qty: number;
}

export default class FoodMenuItem extends React.Component<IAppProps, IAppState> {

  state: IAppState;
  props: IAppProps;

  constructor(props) {
    super(props);

    this.state = {
      menuItem: null,
      qty: 0
    };
  }

  componentDidMount() {
    const menuItem = model.getFoodMenuItemById(this.props.menuItemId);
    const qty = model.getCartQty(this.props.menuItemId);
    this.setState({ menuItem, qty });
  }

  onBackClicked() {
    model.setCartQty(this.props.menuItemId, this.state.qty);
    foodMenuItemFlowControl.onBackClicked();
  }

  onValueChange(newValue) {
    this.setState({ qty: newValue });
  }

  render() {
    if(!this.state.menuItem) {
      return <View />
    } else {
      return (
        <FoodMenuItemComponent
          menuItem={this.state.menuItem}
          initialValue={this.state.qty}
          onBackClicked={this.onBackClicked.bind(this)}
          onValueChange={this.onValueChange.bind(this)}
        />
      )
    }
  }
}