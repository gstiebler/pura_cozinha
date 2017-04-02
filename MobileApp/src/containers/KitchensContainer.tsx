import React, { Component } from 'react';
import { model } from '../Startup';
import { KitchenWithDist } from '../Model';
import { getGeolocation} from '../lib/geolocation';
import KitchensComponent from '../components/KitchensComponent';

interface IAppProps {
  navigator: any;
}

interface IAppState {
  kitchens: KitchenWithDist[];
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      kitchens: []
    }
  }

  componentDidMount() {
    this.getKitchens();
  }

  async getKitchens() {
    const currCoordinates = await getGeolocation();
    const geoCoordinates = {
      lat: currCoordinates.latitude,
      lng: currCoordinates.longitude
    };
    const kitchens = await model.getKitchensByDistance(geoCoordinates);
    console.log(kitchens);
    this.setState({ kitchens });
  }

  onItemSelected(rowData: KitchenWithDist) {
    console.log(rowData);
    // this.props.navigator.push({id: 'menu_item', menuItemId: rowData._id});
  }

  render() {
    return (
      <KitchensComponent kitchens={this.state.kitchens}
                         onItemSelected={this.onItemSelected.bind(this)}
      />
    );
  }
}