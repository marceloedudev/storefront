import {
  getUserAccessTokenAdapter,
  removeUserAccessTokenAdapter,
} from '../user-access-token';

import UserRevokeTokenService from '@data/services/user/user-revoke-token';
import { removeUserRefreshTokenAdapter } from '../user-refresh-token';

export const removeUserSessionAdapter = async () => {
  try {
    const accessToken = getUserAccessTokenAdapter();
    await UserRevokeTokenService.execute({
      grant_type: 'access_token',
      token: accessToken,
    });

    removeUserAccessTokenAdapter();
    removeUserRefreshTokenAdapter();
  } catch (err) {
    removeUserAccessTokenAdapter();
    removeUserRefreshTokenAdapter();
  }
};
