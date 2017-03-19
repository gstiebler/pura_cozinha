import * as React from 'react';
import FoodMenuItemsComponent from '../components/FoodMenuItems';
import model from '../lib/Model';

interface IAppProps {
}

interface IAppState {
  menuItems: any[];
}

export default class FoodMenuItems extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      menuItems: []
    };
  }

  componentDidMount() {
    this.getFoodMenuItems();
  }

  async getFoodMenuItems() {
    const menuItems = await model.getFoodMenuItems();
    this.setState({ menuItems });
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <FoodMenuItemsComponent items={this.state.menuItems}/>
      </div>
    );
  }
}