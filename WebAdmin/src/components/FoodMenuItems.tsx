import * as React from 'react';

export default function FoodMenuItems({ items }) {

  const htmlItems = items.map(item => { return <div key={item._id}>{item.title}</div> });

  return (
    <div>{ htmlItems }</div>
  );
};