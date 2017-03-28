import * as React from 'react';
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
      kitchen: null,
      kitchenFields: [
        { name: 'name', label: 'Nome' },
        { name: 'address', label: 'Endereço' },
      ]
    };
  }

  onChange(name: string, value: string) {
    console.log(name, value);
  }

  public render(): React.ReactElement<any> {
    return (
      <EditKitchenComponent.render 
        kitchenFields={this.state.kitchenFields}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}