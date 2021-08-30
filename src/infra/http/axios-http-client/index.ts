import { HttpClient, HttpRequest, HttpResponse } from '@core/infra/http-client';

import { AxiosResponse } from 'axios';
import axiosClient from './axios-http-client';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse;

    try {
      response = await axiosClient.request({
        url: data.url,
        method: data.method,
        data: data?.body,
        headers: data?.headers,
      });

      return Promise.resolve({
        statusCode: response.status,
        body: response.data,
      });
    } catch (error: any) {
      response = error.response;

      const statusCode = response.status || 500;

      return Promise.reject({
        statusCode,
        body: response.data,
      });
    }
  }
}
