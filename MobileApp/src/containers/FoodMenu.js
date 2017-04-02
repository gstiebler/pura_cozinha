import React, { Component } from 'react';
import { model } from '../Startup';
import FoodMenuComponent from '../components/FoodMenuComponent';

export default class FoodMenu extends Component {
  constructor(props){
    super(props);

    this.state = {
      foodMenuItems: []
    }
  }

  componentDidMount() {
    this.getFoodMenu();
  }

  async getFoodMenu() {
    await model.fetchFoodMenu();
    const foodMenuItems = model.getFoodMenu();
    this.setState({ foodMenuItems });
  }

  onItemSelected(rowData) {
    this.props.navigator.push({id: 'menu_item', menuItemId: rowData.id});
  }

  render() {
    return (
      <FoodMenuComponent foodMenu={this.state.foodMenuItems}
                         onItemSelected={this.onItemSelected.bind(this)}
      />    
    )
  }
}