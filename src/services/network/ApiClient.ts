import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupCache, AxiosCacheInstance } from 'axios-cache-interceptor';
import JSONbig from 'json-bigint';

import { ApiConfiguration } from './ApiConfiguration';

export default class ApiClient {
  private client: AxiosInstance | AxiosCacheInstance;

  protected createAxiosClient(apiConfiguration: ApiConfiguration): AxiosInstance {
    const instance = Axios.create({
      baseURL: apiConfiguration.baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 20 * 1000
    });

    if (apiConfiguration.cache) {
      return setupCache(instance, { ttl: 1000000 * 60 * 10 });
    }
    return instance;
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
    this.client.interceptors.request.use(
      async (config) => {
        if (apiConfiguration?.requestUse) {
          return await apiConfiguration.requestUse(config);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.defaults.transformResponse = [
      (data) => {
        try {
          return JSONbig({ useNativeBigInt: true }).parse(data);
        } catch {
          return data;
        }
      }
    ];

    this.client.interceptors.response.use(
      async (config) => {
        if (apiConfiguration?.responseUse) {
          return await apiConfiguration.responseUse(config);
        }
        return config;
      },
      async (error) => {
        if (
          apiConfiguration.responseUseError &&
          (await (apiConfiguration.responseUseError(error) as unknown as Promise<unknown>))
        ) {
          return await apiConfiguration.responseUseError(error);
        }
        return Promise.reject(error.response?.data ?? error);
      }
    );
  }
  async post<TRequest, TResponse>(path: string, payload?: TRequest, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.post(path, payload, config);
    return response?.data;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.patch<TResponse>(path, payload, config);
    return response.data;
  }

  async delete<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(path, config);
    return response.data;
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    const response = await this.client.put<TResponse>(path, payload);
    return response.data;
  }

  async get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path, config);
    return response?.data;
  }
}
