import { InputBase } from '@view/components/Input';
import React from 'react';
import { useSignIn } from '../../contexts/useSignIn';

export interface IInput {
  name: string;
  type: string;
  label: string;
  inputProps?: any;
  helperText?: string;
  autoComplete?: string;
}

const Input: React.FC<IInput> = ({
  name,
  type,
  label,
  inputProps,
  helperText,
  autoComplete,
}) => {
  const { state, actions } = useSignIn();

  return (
    <InputBase
      name={name}
      type={type}
      label={label}
      inputProps={inputProps}
      helperText={helperText}
      autoComplete={autoComplete}
      state={state.data}
      setState={actions.setData}
    />
  );
};

export default Input;
