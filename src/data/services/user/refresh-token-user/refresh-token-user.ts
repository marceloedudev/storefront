import { HttpClient, HttpResponse } from '@core/infra/http-client';
import {
  IUserRefreshTokenRequest,
  IUserRefreshTokenResponse,
} from '@data/models/user';

import { Service } from '@core/domain';

class RefreshTokenUser
  implements
    Service<
      IUserRefreshTokenRequest,
      Promise<HttpResponse<IUserRefreshTokenResponse>>
    >
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserRefreshTokenResponse> & any,
    private readonly pathService: string,
  ) {}

  async execute(params: IUserRefreshTokenRequest) {
    return this.httpClient.request({
      url: `${this.url}${this.pathService}/user/tokens`,
      method: 'post',
      data: params,
    } as any);
  }
}

export default RefreshTokenUser;
