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

  componentDidMount() {
    this.setState({foodMenuItems: model.getFoodMenu()});
  }

  onItemSelected(rowData) {
    this.props.navigator.push({id: 'menu_item', menu_item_id: rowData.id});
  }

  render() {
    return (
      <FoodMenuComponent foodMenu={this.state.foodMenuItems}
                         onItemSelected={this.onItemSelected.bind(this)}
      />    
    )
  }
}