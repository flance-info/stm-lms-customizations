import axios, { AxiosRequestConfig, Method } from 'axios';

import { Config, FilePayload, RequestParams } from './interfaces';

export class DataProvider {
  private _rootUrl: string;
  private _token: string;

  constructor(rootUrl: string, token: string) {
    this._rootUrl = rootUrl;
    this._token = token;
  }

  getBaseUrl = (url: string) => `${this._rootUrl}${url}`;

  getOverrideRequestOptions = (options: AxiosRequestConfig) => {
    const OVERRIDDEN_METHODS = ['DELETE', 'PATCH', 'PUT'];
    const { headers, method, ...restOptions } = options;

    return {
      headers: { ...headers, 'X-HTTP-Method-Override': method },
      method:  OVERRIDDEN_METHODS.includes(method as Method) ? 'POST' : method,
      ...restOptions,
    };
  };

  request = async <T = any>(requestUrl: string, params: RequestParams) => {
    let url = this.getBaseUrl(requestUrl);

    if (params.queryString) {
      url = `${url}/${params.queryString}`;
    }

    const options = this.getOverrideRequestOptions(params.options);

    return await axios
      .request<T>({ url, ...options, withCredentials: true })
      .then((response) => response.data)
      .catch((e) => {
        let error;

        if (e.response) {
          const errorData = e.response.data;

          if (errorData.message) {
            error = errorData.message;
          }

          if (errorData.errors) {
            error = errorData.errors;
          }
        } else {
          error = e.code;
        }

        if (!error) {
          throw new Error('An error occurred');
        }

        throw error;
      });
  };

  getHeaders = (asFIle = false) => {
    return {
      'Content-Type': asFIle ? 'multipart/forms-data' : 'application/json',
      'X-WP-Nonce': this._token,
    };
  };

  getData = (attributes: object = {}): string => JSON.stringify(attributes);

  get = <T = any>(url: string, queryString?: string): Promise<T> => {
    const params = {
      options: {
        method: 'GET' as Method,
        headers: this.getHeaders(),
      },
      queryString,
    };

    return this.request<T>(url, params);
  };

  post = (url: string, data: object) => {
    const params = {
      options: {
        method: 'POST' as Method,
        headers: this.getHeaders(),
        data: this.getData(data),
      },
    };

    return this.request(url, params);
  };

  remove = (url: string, data: object = {}) => {
    const params = {
      options: {
        method: 'DELETE' as Method,
        headers: this.getHeaders(),
        data: this.getData(data),
      },
    };

    return this.request(url, params);
  };

  patch = (url: string, data: object) => {
    const params = {
      options: {
        method: 'PATCH' as Method,
        headers: this.getHeaders(),
        data: this.getData(data),
      },
    };
    return this.request(url, params);
  };

  put = (url: string, data: object) => {
    const params = {
      options: {
        method: 'PUT' as Method,
        headers: this.getHeaders(),
        data: this.getData(data),
      },
    };

    return this.request(url, params);
  };

  postFile = (url: string, data: FilePayload, config?: Config) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const params = {
      options: {
        method: 'POST' as Method,
        headers: this.getHeaders(true),
        data: formData,
        ...config,
      },
    };

    return this.request(url, params);
  };
}
