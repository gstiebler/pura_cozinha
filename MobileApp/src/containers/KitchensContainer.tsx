import React, { Component } from 'react';
import { model } from '../Startup';
import { KitchenWithDist } from '../Model';
import { getGeolocation} from '../lib/geolocation';
import KitchensComponent from '../components/KitchensComponent';
import { kitchensFlowControl } from '../FlowControl';

interface IAppProps {}

interface IAppState {
  kitchens: KitchenWithDist[];
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
      kitchens: []
    };
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
    this.setState({ kitchens });
  }

  onItemSelected(rowData: KitchenWithDist) {
    model.setSelectedKitchenId(rowData._id);
    kitchensFlowControl.onKitchenSelected(rowData._id);
  }

  render() {
    return (
      <KitchensComponent kitchens={this.state.kitchens}
                         onItemSelected={this.onItemSelected.bind(this)}
      />
    );
  }
}