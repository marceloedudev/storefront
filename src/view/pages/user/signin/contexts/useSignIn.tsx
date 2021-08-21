import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const SignInContext = createContext({} as ISignInContext);

export const SignInProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const value = useMemo<ISignInContext>(
    () => ({
      state: {
        loading,
        data,
        errors,
      },
      actions: {
        setLoading,
        setData,
        setErrors,
      },
    }),
    [loading, data, errors],
  );

  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
};

export const useSignIn = () => {
  return useContext(SignInContext);
};

export interface ISignInState {
  loading: boolean;
  data: any;
  errors: any;
}

export interface ISignInActions {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<any>>;
  setErrors: Dispatch<SetStateAction<any>>;
}

export interface ISignInContext {
  state: ISignInState;
  actions: ISignInActions;
}
