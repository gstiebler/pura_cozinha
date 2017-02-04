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

  render() {
    return <FoodMenuComponent foodMenu={this.state.foodMenuItems}/>    
  }
}