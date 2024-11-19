import ApiClient from '@/services/network/ApiClient';
import { IGenerateRequest, IGenerateResponse } from './types';

export default class SearchService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async generate(data: IGenerateRequest): Promise<IGenerateResponse> {
    return await this.apiClient.post<IGenerateRequest, IGenerateResponse>(`api/search-and-generate_yon`, data);
  }
}
