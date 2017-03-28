import * as React from 'react';
import { browserHistory } from 'react-router';
import KitchensComponent from '../components/KitchensComponent';
import { model } from '../Startup';
import { Kitchen } from '../lib/Model';

interface IAppProps {
}

interface IAppState {
  kitchens: Kitchen[];
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      kitchens: []
    };
  }

  componentDidMount() {
    this.getKitchens();
  }

  async getKitchens() {
    const kitchens = await model.getKitchens();
    this.setState({ kitchens });
  }

  onAdd() {
    browserHistory.push('/admin_app/edit_kitchen');
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <KitchensComponent kitchens={this.state.kitchens} onAdd={this.onAdd.bind(this)}/>
      </div>
    );
  }
}