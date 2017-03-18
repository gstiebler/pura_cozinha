import React, { Component } from 'react';
import model from '../Model';
import FoodMenuComponent from '../components/FoodMenuComponent';

export default class FoodMenu extends Component {
  constructor(props){
    super(props);

    this.state = {
      foodMenuItems: []
    }
  }

  async componentDidMount() {
    this.test();
  }

  async test() {
    const foodMenuItems = await model.getFoodMenu();
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