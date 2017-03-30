import * as React from 'react';
import { browserHistory } from 'react-router';
import FoodMenuItemsComponent from '../components/FoodMenuItems';
import { model } from '../Startup';

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

  onAdd() {
    browserHistory.push('/admin_app/edit_food_menu_item');
  }

  onEdit(id: string) {
    browserHistory.push('/admin_app/edit_food_menu_item?id=' + id);
  }

  async onDelete(id: string) {
    await model.deleteFoodMenuItem(id);
    this.getFoodMenuItems();
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <FoodMenuItemsComponent
          foodMenuItems={this.state.menuItems}
          onAdd={this.onAdd.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
      </div>
    );
  }
}