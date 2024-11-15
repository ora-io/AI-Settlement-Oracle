export interface IGenerateRequest {
  user_input: string;
  max_length?: string;
}
export interface ISearchResultItem {
  url: string;
  context: string;
  source_from: string;
}
export interface IGenerateData {
  prompt: string;
  search_result: ISearchResultItem[];
  status: 'success' | 'error';
  error: string;
}
export type IGenerateResponse = Awaited<Readonly<IGenerateData>>;
