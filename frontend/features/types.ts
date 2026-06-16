export interface BackendResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
