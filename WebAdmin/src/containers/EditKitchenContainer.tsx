import * as React from 'react';
import { browserHistory } from 'react-router';
import * as EditFieldsComponent from '../components/EditFieldsComponent';
import { model } from '../Startup';
import { Kitchen } from '../lib/Model';

interface IAppProps {
  location: any;
}

interface IAppState {
  kitchen: Kitchen;
  kitchenFields: EditFieldsComponent.NameLabel[];
  id: string;
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      id: props.location.query.id,
      kitchen: { name: '', address: '' },
      kitchenFields: [
        { name: 'name', label: 'Nome' },
        { name: 'address', label: 'Endereço' },
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
    this.setState({ kitchen });
  }

  onChange(name: string, value: string) {
    this.state.kitchen[name] = value;
    this.setState(this.state);
  }

  async onSave() {
    if (this.state.id) {
      this.state.kitchen._id = this.state.id;
      await model.updateKitchen(this.state.kitchen);
    } else {
      await model.saveKitchen(this.state.kitchen);
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