import * as React from 'react';
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

  public render(): React.ReactElement<any> {
    return (
      <div>
        <KitchensComponent kitchens={this.state.kitchens}/>
      </div>
    );
  }
}