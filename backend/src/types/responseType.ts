export type TResponsePayload = {
  message: string;
  data: any | null;
  error: any | null;
};

export type TResponsePayloadPaginated = {
  message: string;
  data: any[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};
