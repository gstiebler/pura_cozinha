import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'mobx-router';
import views from '../Views';
import { Store } from '../model/Store';

interface IProps {
  store: Store;
}

function HelloComponent(props: IProps) {
  return (
    <div>
      <h2>Hello component! </h2>
    </div>
  );
}

export default observer(HelloComponent);
