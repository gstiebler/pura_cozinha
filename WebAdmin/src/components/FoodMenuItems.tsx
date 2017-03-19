import * as React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { formatCurrency } from '../lib/StringUtils';

export default function FoodMenuItems({ items }) {
  // const htmlItems = items.map(item => { return <div key={item._id}>{item.title}</div> });

  return (
    <Table
      rowsCount={items.length}
      rowHeight={50}
      headerHeight={50}
      width={800}
      height={500}>
      <Column
        header={<Cell>Item</Cell>}
        cell={props => (
          <Cell {...props}>
            {items[props.rowIndex].title}
          </Cell>
        )}
        width={200}
      />
      <Column
        header={<Cell>Descrição</Cell>}
        cell={props => (
          <Cell {...props}>
            {items[props.rowIndex].description}
          </Cell>
        )}
        width={400}
      />
      <Column
        header={<Cell>Preço</Cell>}
        cell={props => (
          <Cell {...props}>
            {formatCurrency(items[props.rowIndex].price)}
          </Cell>
        )}
        width={200} align='right'
      />
    </Table>
  );
};