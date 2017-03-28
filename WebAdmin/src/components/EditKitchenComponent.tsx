import * as React from 'react';

export interface NameLabel {
  name: string;
  label: string;
}

export interface Props {
  kitchenFields: NameLabel[];
  onChange(name: string, value: string);
}

export function render(props: Props) {
  const { kitchenFields, onChange } = props;
  const htmlFields = kitchenFields.map((kf, i) => {
    return (
      <div key={i + 'htmlFields'}>
        <div className='form-group'>
          <label className='control-label col-sm-2'>{kf.label}:</label>
          <div className='col-sm-10'>
            <input type='text' className='form-control'
                    defaultValue={ '' }
                    onChange={evt => onChange(kf.name, evt.target.value) }
            />
          </div>
        </div>
        <br/>
      </div>
    );
  });

  return (
    <div>
      {htmlFields}
    </div>
  );
}