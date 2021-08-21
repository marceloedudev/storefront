import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  getUserAccessTokenAdapter,
  setUserAccessTokenAdapter,
} from '@main/adapters/user-access-token';
import {
  getUserRefreshTokenAdapter,
  setUserRefreshTokenAdapter,
} from '@main/adapters/user-refresh-token';

import AxiosInterceptorRequest from './interceptors/interceptor-request';
import AxiosInterceptorResponse from './interceptors/interceptor-response';
import RefreshTokenUserService from '@data/services/user/refresh-token-user';
import { removeUserSessionAdapter } from '@main/adapters/user-account';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return new AxiosInterceptorRequest(config).execute();
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const refreshToken = getUserRefreshTokenAdapter();

    const accessToken = getUserAccessTokenAdapter();

    const logged = !!accessToken?.length;

    return new AxiosInterceptorResponse(error, logged, async () => {
      try {
        const tokenData = await RefreshTokenUserService.execute({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        });

        const { access_token: newAccessToken, refresh_token: newRefreshToken } =
          tokenData.data;

        setUserAccessTokenAdapter(newAccessToken);
        setUserRefreshTokenAdapter(newRefreshToken);

        return Promise.resolve({
          accessToken: newAccessToken,
        });
      } catch (err) {
        await removeUserSessionAdapter();
        window.location.reload();
        return Promise.reject(err);
      }
    })
      .failed()
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
);

export default axiosClient;
