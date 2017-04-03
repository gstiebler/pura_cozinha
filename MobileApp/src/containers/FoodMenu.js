import React, { Component } from 'react';
import { model } from '../Startup';
import FoodMenuComponent from '../components/FoodMenuComponent';
import { foodMenuListFlowControl } from '../FlowControl';

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

  render() {
    return (
      <FoodMenuComponent
        foodMenu={this.state.foodMenuItems}
        onItemSelected={(rowData) => { foodMenuListFlowControl.onFoodSelected(rowData.id) }}
      />
    )
  }
}