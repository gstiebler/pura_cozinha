import * as React from 'react';
import FoodMenuItemsComponent from '../components/FoodMenuItems';
import model from '../lib/Model';

interface IAppProps {
}

interface IAppState { }

export default class FoodMenuItems extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getFoodMenuItems();
  }

  async getFoodMenuItems() {
    const menuItems = await model.getFoodMenuItems();
    console.log(JSON.stringify(menuItems));
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <FoodMenuItemsComponent />
      </div>
    );
  }
}