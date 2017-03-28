import * as React from 'react';
import { browserHistory } from 'react-router';
import * as EditKitchenComponent from '../components/EditKitchenComponent';
import { model } from '../Startup';
import { Kitchen } from '../lib/Model';

interface IAppProps {
}

interface IAppState {
  kitchen: Kitchen;
  kitchenFields: EditKitchenComponent.NameLabel[];
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      kitchen: { name: '', address: '' },
      kitchenFields: [
        { name: 'name', label: 'Nome' },
        { name: 'address', label: 'Endereço' },
      ]
    };
  }

  onChange(name: string, value: string) {
    this.state.kitchen[name] = value;
    this.setState(this.state);
  }

  async onSave() {
    await model.saveKitchen(this.state.kitchen);
    browserHistory.push('/admin_app/kitchens');
  }

  public render(): React.ReactElement<any> {
    return (
      <EditKitchenComponent.render 
        kitchenFields={this.state.kitchenFields}
        onChange={this.onChange.bind(this)}
        onSave={this.onSave.bind(this)}
      />
    );
  }
}