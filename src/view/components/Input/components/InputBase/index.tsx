import { Container, HelperContainer, Input, Label } from './styles';
import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

export interface IFloatingLabelInputProps {
  icon: JSX.Element;
}

export interface IFloatingLabelInput
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  helperText?: string;
  state?: any;
  setState?: any;
  inputProps?: IFloatingLabelInputProps;
  autoComplete?: string | 'undefined';
  ref?: any;
}

export const InputBase: React.FC<IFloatingLabelInput> = React.forwardRef(
  (props: IFloatingLabelInput, ref) => {
    const {
      name,
      label,
      helperText,
      inputProps,
      state,
      setState,
      autoComplete,
      ...restProps
    } = props;

    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    const [values, setValues] = useState({
      active: false,
      focusActive: false,
    });

    const onMouseBlurHandler = useCallback(
      (event) => {
        setValues((oldState) => ({
          ...oldState,
          active: event.target.value.length !== 0,
          focusActive: false,
        }));
      },
      [setValues],
    );

    const onMouseFocusHandler = useCallback(() => {
      setValues((oldState) => ({
        ...oldState,
        active: true,
        focusActive: true,
      }));
    }, [setValues]);

    return (
      <div>
        <Container
          active={values.active}
          helperActive={!!(helperText && helperText.length)}
          focusActive={values.focusActive}
        >
          <Label
            htmlFor={name}
            active={values.active}
            helperActive={!!(helperText && helperText.length)}
            focusActive={values.focusActive}
          >
            {label}
          </Label>

          <Input
            name={name}
            active={values.active}
            helperActive={!!(helperText && helperText.length)}
            focusActive={values.focusActive}
            onBlur={onMouseBlurHandler}
            onFocus={onMouseFocusHandler}
            onChange={(event) => {
              setState({ ...state, [event.target.name]: event.target.value });
            }}
            ref={resolvedRef}
            autoComplete={autoComplete || 'off'}
            data-testid={name}
            {...restProps}
          />
          {inputProps && inputProps.icon && (
            <div className="inputbase-icon-container">
              <div className="inputbase-icon-content">{inputProps.icon}</div>
            </div>
          )}
        </Container>

        <HelperContainer>
          {helperText && <p data-testid={`${name}-helper`}>{helperText}</p>}
        </HelperContainer>
      </div>
    );
  },
);
