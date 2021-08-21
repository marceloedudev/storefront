import { HttpClient, HttpResponse } from '@core/infra/http-client';

import { IUserInfoTokenResponse } from '@data/models/user';
import { Service } from '@core/domain';

class UserMe
  implements Service<null, Promise<HttpResponse<IUserInfoTokenResponse>>>
{
  constructor(
    private readonly httpClient: HttpClient<IUserInfoTokenResponse>,
    private readonly pathService: string,
  ) {}

  async execute() {
    return this.httpClient.request({
      url: `${this.pathService}/user/me`,
      method: 'get',
    });
  }
}

export default UserMe;
