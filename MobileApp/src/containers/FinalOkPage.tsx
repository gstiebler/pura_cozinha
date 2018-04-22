import React, { Component } from 'react';
import { View } from 'react-native';
import MessagePageComponent from '../components/MessagePageComponent';
import { model } from '../Startup';
import { finalOkPageFlowControl } from '../FlowControl';

interface IAppProps {
}

interface IAppState {
}

export default class FinalOkPage extends Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <MessagePageComponent
        message='Obrigado por comprar com o Burg & Bowl! Em breve seu pedido será entregue'
        onOkClicked={finalOkPageFlowControl.onOkClicked}
      />
    );
  }
}