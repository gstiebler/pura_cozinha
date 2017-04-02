import * as React from 'react';
import { browserHistory } from 'react-router';
import * as EditFieldsComponent from '../components/EditFieldsComponent';
import { model } from '../Startup';
import { Kitchen } from '../lib/Model';

interface IAppProps {
  location: any;
}

interface IAppState {
  kitchen: any;
  kitchenFields: EditFieldsComponent.NameLabel[];
  id: string;
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      id: props.location.query.id,
      kitchen: {
        name: '',
        address: '',
        lat: 0.0,
        lng: 0.0
      },
      kitchenFields: [
        { name: 'name', label: 'Nome' },
        { name: 'address', label: 'Endereço' },
        { name: 'lat', label: 'Latitude' },
        { name: 'lng', label: 'Longitude' },
      ]
    };
  }

  componentDidMount() {
    if (this.state.id) {
      this.getKitchen();
    }
  }

  async getKitchen() {
    const kitchen = await model.getKitchen(this.state.id);
    const kitchenEditObj = {
      name: kitchen.name,
      address: kitchen.address,
      lat: kitchen.coordinates.lat,
      lng: kitchen.coordinates.lng
    }
    this.setState({ kitchen: kitchenEditObj });
  }

  onChange(name: string, value: string) {
    this.state.kitchen[name] = value;
    this.setState(this.state);
  }

  async onSave() {
    const kitchen: Kitchen = {
      name: this.state.kitchen.name,
      address: this.state.kitchen.address,
      coordinates: {
        lat: this.state.kitchen.lat,
        lng: this.state.kitchen.lng
      }
    }
    if (this.state.id) {
      kitchen._id = this.state.id;
      await model.updateKitchen(kitchen);
    } else {
      await model.saveKitchen(kitchen);
    }
    browserHistory.push('/admin_app/kitchens');
  }

  public render(): React.ReactElement<any> {
    return (
      <EditFieldsComponent.render
        fields={this.state.kitchenFields}
        onChange={this.onChange.bind(this)}
        onSave={this.onSave.bind(this)}
        obj={this.state.kitchen}
      />
    );
  }
}