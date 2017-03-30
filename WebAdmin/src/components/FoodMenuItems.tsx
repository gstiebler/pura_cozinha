import * as React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { formatCurrency } from '../lib/StringUtils';
import { FoodMenuItem } from '../lib/Model';

interface Props {
  foodMenuItems: FoodMenuItem[];
  onAdd();
  onEdit(id: string);
  onDelete(id: string);
}

export default function FoodMenuItems(props: Props) {
  const { foodMenuItems, onAdd, onEdit, onDelete } = props;
  return (
    <div>
      <Table
        rowsCount={foodMenuItems.length}
        rowHeight={50}
        headerHeight={50}
        width={1100}
        height={700}>
        <Column
          header={<Cell>Item</Cell>}
          cell={props => (
            <Cell {...props}>
              {foodMenuItems[props.rowIndex].title}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Descrição</Cell>}
          cell={props => (
            <Cell {...props}>
              {foodMenuItems[props.rowIndex].description}
            </Cell>
          )}
          width={400}
        />
        <Column
          header={<Cell>Preço</Cell>}
          cell={props => (
            <Cell {...props}>
              {formatCurrency(foodMenuItems[props.rowIndex].price)}
            </Cell>
          )}
          width={200} align='right'
        />
        <Column
          header={<Cell>Editar</Cell>}
          cell={props => (
            <Cell {...props}>
              <a className='btn btn-large btn-primary'
                  onClick={() => onEdit(foodMenuItems[props.rowIndex]._id)}>
                Editar
              </a>
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Apagar</Cell>}
          cell={props => (
            <Cell {...props}>
              <a className='btn btn-large btn-danger'
                  onClick={() => onDelete(foodMenuItems[props.rowIndex]._id)}>
                Apagar
              </a>
            </Cell>
          )}
          width={200}
        />
      </Table>
      <br />
      <button className='btn btn-large btn-success' onClick={onAdd} >Adicionar</button>
    </div>
  );
};