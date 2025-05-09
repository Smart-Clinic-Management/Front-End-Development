export interface IApiResponse<T> {
  statusCode: number;
  message: string | null;
  errors: string[] | null;
  data: T;
}
