import * as React from 'react';
import { browserHistory } from 'react-router';
import * as EditFieldsComponent from '../components/EditFieldsComponent';
import { model } from '../Startup';
import { FoodMenuItem } from '../lib/Model';

interface IAppProps {
  location: any;
}

interface IAppState {
  foodMenuItem: FoodMenuItem;
  foodMenuItemFields: EditFieldsComponent.NameLabel[];
  id: string;
}

export default class Kitchens extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      id: props.location.query.id,
      foodMenuItem: { title: '', description: '', price: 0.0, imgURL: '' },
      foodMenuItemFields: [
        { name: 'title', label: 'Título' },
        { name: 'description', label: 'Descrição' },
        { name: 'price', label: 'Preço' },
        { name: 'imgURL', label: 'URL da image' },
      ]
    };
  }

  componentDidMount() {
    if (this.state.id) {
      this.getFoodMenuItem();
    }
  }

  async getFoodMenuItem() {
    const foodMenuItem = await model.getFoodMenuItem(this.state.id);
    this.setState({ foodMenuItem });
  }

  onChange(name: string, value: string) {
    this.state.foodMenuItem[name] = value;
    this.setState(this.state);
  }

  async onSave() {
    if (this.state.id) {
      this.state.foodMenuItem._id = this.state.id;
      await model.updateFoodMenuItem(this.state.foodMenuItem);
    } else {
      await model.saveFoodMenuItem(this.state.foodMenuItem);
    }
    browserHistory.push('/admin_app/food_menu_items');
  }

  public render(): React.ReactElement<any> {
    return (
      <EditFieldsComponent.render
        fields={this.state.foodMenuItemFields}
        onChange={this.onChange.bind(this)}
        onSave={this.onSave.bind(this)}
        obj={this.state.foodMenuItem}
      />
    );
  }
}