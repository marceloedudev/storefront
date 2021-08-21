import { HttpClient, HttpResponse } from '@core/infra/http-client';

import { IUserRevokeTokenRequest } from '@data/models/user';
import { Service } from '@core/domain';

class UserRevokeToken
  implements Service<IUserRevokeTokenRequest, Promise<HttpResponse<null>>>
{
  constructor(
    private readonly httpClient: HttpClient<null>,
    private readonly pathService: string,
  ) {}

  async execute(params: IUserRevokeTokenRequest) {
    return this.httpClient.request({
      url: `${this.pathService}/user/revoke`,
      method: 'post',
      body: params,
    });
  }
}

export default UserRevokeToken;
