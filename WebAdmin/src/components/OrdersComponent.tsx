import * as React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import * as StringUtils from '../lib/StringUtils';
import { dateTimeFormat } from '../lib/DateUtils';

export default function Orders({ items }) {
  // const htmlItems = items.map(item => { return <div key={item._id}>{item.title}</div> });

  return (
    <div>
      <Table
        rowsCount={items.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}>
        <Column
          header={<Cell>Momento</Cell>}
          cell={props => (
            <Cell {...props}>
              {dateTimeFormat(items[props.rowIndex].datetime)}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Status</Cell>}
          cell={props => (
            <Cell {...props}>
              {items[props.rowIndex].status}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Cozinha</Cell>}
          cell={props => (
            <Cell {...props}>
              {items[props.rowIndex].kitchen.name}
            </Cell>
          )}
          width={400}
        />
        <Column
          header={<Cell>Total</Cell>}
          cell={props => (
            <Cell {...props}>
              {StringUtils.formatCurrency(items[props.rowIndex].total)}
            </Cell>
          )}
          width={200} align='right'
        />
      </Table>
    </div>
  );
};