import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class ApiConfiguration {
  public cache?: boolean;
  public accessToken?: string;
  public baseURL?: string;
  public requestUse?: (
    config: InternalAxiosRequestConfig<unknown>
  ) => Promise<InternalAxiosRequestConfig<unknown>> | InternalAxiosRequestConfig<unknown>;
  public responseUse?: (
    config: AxiosResponse<unknown, unknown>
  ) => Promise<AxiosResponse<unknown, unknown>> | AxiosResponse<unknown, unknown>;
  public responseUseError?: (error: AxiosError) => void;

  constructor({
    cache,
    baseURL,
    accessToken,
    requestUse,
    responseUse,
    responseUseError
  }: {
    cache?: boolean;
    baseURL?: string;
    accessToken?: string;
    requestUse?: (
      config: InternalAxiosRequestConfig<unknown>
    ) => Promise<InternalAxiosRequestConfig<unknown>> | InternalAxiosRequestConfig<unknown>;
    responseUse?: (
      config: AxiosResponse<unknown, unknown>
    ) => Promise<AxiosResponse<unknown, unknown>> | AxiosResponse<unknown, unknown>;
    responseUseError?: (error: AxiosError) => Promise<unknown>;
  }) {
    this.cache = cache;
    this.baseURL = baseURL;
    this.accessToken = accessToken;
    this.requestUse = requestUse;
    this.responseUse = responseUse;
    this.responseUseError = responseUseError;
  }
}
