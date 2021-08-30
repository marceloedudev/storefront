/* eslint-disable react-hooks/exhaustive-deps */

import { ToastError, ToastSuccess } from '@view/components/Toast';

import TokensUser from '@data/services/user/tokens-user/tokens-user';
import { currentTokenState } from '@view/atoms';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { useSignIn } from '../contexts/useSignIn';

type IUseFormSignIn = {
  fieldValidators: any;
  tokensService: TokensUser;
};

const useFormSignIn = ({ fieldValidators, tokensService }: IUseFormSignIn) => {
  const { state, actions } = useSignIn();

  const { setAccessToken, setRefreshToken } = useRecoilValue(currentTokenState);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        actions.setErrors(fieldValidators.validate(state.data));

        if (fieldValidators.filter(state.data).length || state.loading) {
          return;
        }

        actions.setLoading(true);

        const userLogin = await tokensService.execute({
          grant_type: 'password',
          username: state.data.email,
          password: state.data.password,
        });

        ToastSuccess({ message: 'Logged successful' });

        const { access_token, refresh_token } = userLogin.body;

        setAccessToken(access_token);

        setRefreshToken(refresh_token);

        window.location.reload();
      } catch (err: any) {
        ToastError({ message: err.body.message });
        actions.setLoading(false);
      }
    },
    [
      actions.setErrors,
      actions.setLoading,
      fieldValidators,
      setAccessToken,
      setRefreshToken,
      state.data,
      state.loading,
      tokensService,
    ],
  );

  return {
    onSubmit,
  };
};

export default useFormSignIn;
