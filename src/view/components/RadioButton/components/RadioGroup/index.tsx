import React from 'react';

export interface IRadioGroup {
  name: string;
  label: string;
  onChange?: (value) => void;
  state?: any;
  setState?: any;
}

export const RadioGroup: React.FC<IRadioGroup> = ({
  children,
  name,
  onChange,
  label,
  state,
  setState,
}) => {
  const onMouseChangeHandler = React.useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      }

      if (setState && state) {
        setState((oldState) => ({ ...oldState, [name]: event }));
      }
    },
    [name, onChange, setState, state],
  );

  return (
    <div>
      <div>{label}</div>

      {React.Children.map(children, (child: any) => (
        <div>
          {React.cloneElement(child, {
            onChange: onMouseChangeHandler,
            name,
          })}
        </div>
      ))}
    </div>
  );
};
