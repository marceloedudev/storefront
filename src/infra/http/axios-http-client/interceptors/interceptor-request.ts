import { getUserAccessTokenAdapter } from '@main/adapters/user-access-token';

class AxiosInterceptorRequest {
  constructor(private readonly config) {}

  execute() {
    const token = getUserAccessTokenAdapter();

    if (token?.length > 0) {
      this.config.headers['authorization'] = `Bearer ${token}`;
    }

    return this.config;
  }
}

export default AxiosInterceptorRequest;
