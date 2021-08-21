import { AxiosHttpClient } from '@infra/http';
import TokensUser from './tokens-user';
import { pathAuthService } from '@data/paths';

const makeHttpClient = new AxiosHttpClient();

const TokensUserService = new TokensUser(makeHttpClient, pathAuthService);

export default TokensUserService;
