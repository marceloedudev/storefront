export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export interface HttpClient<IRequest = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<IRequest>>;
}

export type HttpResponse<IResponse = any> = {
  statusCode: number;
  body: IResponse;
};
