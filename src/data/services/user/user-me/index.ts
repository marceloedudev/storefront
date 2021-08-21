import { AxiosHttpClient } from '@infra/http';
import UserMe from './user-me';
import { pathAuthService } from '@data/paths';

const makeHttpClient = new AxiosHttpClient();

const UserMeService = new UserMe(makeHttpClient, pathAuthService);

export default UserMeService;
