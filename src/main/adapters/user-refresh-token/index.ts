import LocalStorage from '@infra/storage/local-storage';

export const keyUserRefreshToken = 'RToken';

export const setUserRefreshTokenAdapter = (value): void => {
  LocalStorage.set(keyUserRefreshToken, value);
};

export const getUserRefreshTokenAdapter = () => {
  return LocalStorage.get(keyUserRefreshToken);
};

export const removeUserRefreshTokenAdapter = () => {
  return LocalStorage.destroy(keyUserRefreshToken);
};
