import React, { Component } from 'react';
import SmallOrderSummaryComponent from '../components/SmallOrderSummaryComponent';
import { model } from '../Startup';

interface IAppProps {
}

interface IAppState {
}

export default class SmallOrderSummary extends Component<IAppProps, IAppState> {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }
  render() {
    if (false) {
      // return null;
    } else {
      return (
        <SmallOrderSummaryComponent
        />
      );
    }
  }
}