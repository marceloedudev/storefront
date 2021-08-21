import RefreshTokenUser from './refresh-token-user';
import axios from 'axios';
import { pathAuthService } from '@data/paths';

const RefreshTokenUserService = new RefreshTokenUser(
  `${process.env.REACT_APP_API_URL}`,
  axios,
  pathAuthService,
);

export default RefreshTokenUserService;
