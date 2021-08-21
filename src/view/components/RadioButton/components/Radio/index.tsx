import React, { InputHTMLAttributes, useCallback, useRef } from 'react';

import { Container } from './styles';

export interface IRadio extends InputHTMLAttributes<HTMLInputElement | any> {
  name?: string;
  label?: string;
  value: string;
  onChange?: (value) => void;
}

export const Radio: React.FC<IRadio> = React.forwardRef(
  ({ label, value, name, onChange, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    const onMouseChangeHandler = useCallback(
      (event) => {
        if (onChange) {
          onChange(event.target.value);
        }
      },
      [onChange],
    );

    return (
      <Container>
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onMouseChangeHandler}
          id={`${name}[${value}]`}
          {...rest}
          ref={resolvedRef}
        />
        <label htmlFor={value}>{label}</label>
      </Container>
    );
  },
);
