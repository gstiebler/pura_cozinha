import * as React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import * as StringUtils from '../lib/StringUtils';
import { dateTimeFormat } from '../lib/DateUtils';
import { Kitchen } from '../lib/Model';

interface Props {
  kitchens: Kitchen[];
  onAdd();
  onEdit(id: string);
}

export default function Kitchens(props: Props) {
  const { kitchens, onAdd, onEdit } = props;

  return (
    <div>
      <Table
        rowsCount={kitchens.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}>
        <Column
          header={<Cell>Nome</Cell>}
          cell={props => (
            <Cell {...props}>
              {kitchens[props.rowIndex].name}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Endereço</Cell>}
          cell={props => (
            <Cell {...props}>
              {kitchens[props.rowIndex].address}
            </Cell>
          )}
          width={200}
        />
        <Column
          header={<Cell>Editar</Cell>}
          cell={props => (
            <Cell {...props}>
              <a className="btn btn-large btn-primary" 
                  onClick={() => onEdit(kitchens[props.rowIndex]._id)}>
                Editar
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