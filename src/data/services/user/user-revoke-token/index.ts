import { AxiosHttpClient } from '@infra/http';
import UserRevokeToken from './user-revoke-token';
import { pathAuthService } from '@data/paths';

const makeHttpClient = new AxiosHttpClient();

const UserRevokeTokenService = new UserRevokeToken(
  makeHttpClient,
  pathAuthService,
);

export default UserRevokeTokenService;
