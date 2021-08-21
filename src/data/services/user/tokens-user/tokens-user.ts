import { HttpClient, HttpResponse } from '@core/infra/http-client';
import { TokensUserRequest, TokensUserResponse } from '@data/models/user';

import { Service } from '@core/domain';

class TokensUser
  implements
    Service<TokensUserRequest, Promise<HttpResponse<TokensUserResponse>>>
{
  constructor(
    private readonly httpClient: HttpClient<TokensUserResponse>,
    private readonly pathService: string,
  ) {}

  async execute(params: TokensUserRequest) {
    return this.httpClient.request({
      url: `${this.pathService}/user/tokens`,
      method: 'post',
      body: params,
    });
  }
}

export default TokensUser;
