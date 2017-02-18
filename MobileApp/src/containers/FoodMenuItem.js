import React, { Component } from 'react';
import FoodMenuItemComponent from '../components/FoodMenuItemComponent';
import model from '../Model';

export default class FoodMenuItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      menuItem: { title: '' }
    }
  }

  componentDidMount() {
    const menuItem = model.getFoodMenuItemById(this.props.menuItemId);
    this.setState({ menuItem });
  }

  onBackClicked() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <FoodMenuItemComponent
        menuItem={this.state.menuItem}
        onBackClicked={this.onBackClicked.bind(this)}
      />
    )
  }
}