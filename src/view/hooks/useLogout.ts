import { keyUserAccessToken } from '@main/adapters/user-access-token';
import { removeUserSessionAdapter } from '@main/adapters/user-account';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useWindowEvent from './useWindowEvent';

const useLogout = () => {
  const history = useHistory();

  const logoutUser = useCallback(async () => {
    await removeUserSessionAdapter();
    history.replace('/');
  }, [history]);

  const onStorageHandler = useCallback(
    async (e: StorageEvent) => {
      if (
        e.storageArea === localStorage &&
        e.key === keyUserAccessToken &&
        e.oldValue &&
        !e.newValue
      ) {
        await logoutUser();
      }
    },
    [logoutUser],
  );

  useWindowEvent('storage', onStorageHandler);

  return async () => {
    await logoutUser();
  };
};

export default useLogout;
