export type APIErrorResponse = {
  code: string;
  message: string;
  success: boolean;
};

export type APIResponsePaginated<T> = {
  success: boolean;
  message: string;
  data: T;
  meta: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
  };
};
