import * as React from 'react';
import OrdersComponent from '../components/OrdersComponent';
import { model } from '../Startup';

interface IAppProps {
}

interface IAppState {
  orders: any[];
}

export default class Orders extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  async getOrders() {
    const orders = await model.getOrders();
    this.setState({ orders });
  }

  public render(): React.ReactElement<any> {
    return (
      <div>
        <OrdersComponent items={this.state.orders}/>
      </div>
    );
  }
}