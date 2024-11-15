export interface IGenerateRequest {
  user_input: string;
  max_length?: string;
}
export interface IGenerateData {
  prompt: string;
  status: 'success' | 'error';
  error: string;
}
export type IGenerateResponse = Awaited<Readonly<IGenerateData>>;
