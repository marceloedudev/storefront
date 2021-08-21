import { currentAccountState, currentTokenState } from '@view/atoms';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ToastError } from '@view/components/Toast';
import UserMeService from '@data/services/user/user-me';
import { keyUserAccessToken } from '@main/adapters/user-access-token';
import useWindowEvent from './useWindowEvent';

const VerifyUser = () => {
  const { getAccessToken } = useRecoilValue(currentTokenState);

  const setUserState = useSetRecoilState(currentAccountState);

  const logged = !!getAccessToken()?.length;

  const onStorageHandler = useCallback(async (e: StorageEvent) => {
    if (
      e.storageArea === localStorage &&
      e.key === keyUserAccessToken &&
      !e.oldValue &&
      e.newValue
    ) {
      window.location.reload();
    }
  }, []);

  useWindowEvent('storage', onStorageHandler);

  const fetchUser = useCallback(() => {
    if (!logged) {
      return;
    }
    void (async () => {
      try {
        const userResponse: any = await UserMeService.execute();

        setUserState((oldState) => ({
          ...oldState,
          user: userResponse.body,
          loading: false,
        }));
      } catch (err) {
        ToastError({ message: 'Invalid User' });
        setUserState((oldState) => ({
          ...oldState,
          loading: false,
        }));
      }
    })();
  }, [logged, setUserState]);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default VerifyUser;
