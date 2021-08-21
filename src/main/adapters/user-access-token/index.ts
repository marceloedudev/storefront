import LocalStorage from '@infra/storage/local-storage';

export const keyUserAccessToken = 'AToken';

export const setUserAccessTokenAdapter = (value): void => {
  LocalStorage.set(keyUserAccessToken, value);
};

export const getUserAccessTokenAdapter = () => {
  return LocalStorage.get(keyUserAccessToken);
};

export const removeUserAccessTokenAdapter = () => {
  LocalStorage.destroy(keyUserAccessToken);
};
