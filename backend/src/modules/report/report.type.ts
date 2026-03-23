export interface ISearchQuery {
  committeeId: number;
  isSearchByDocument?: boolean | undefined;
  name: string | undefined;
  documentType: string | undefined;
  documentNumber: number | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
  billIssuerId: number | undefined;
}

export type TSearchByDocument = {
  committeeId: number;
  documentType: string;
  documentNumber: number;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  billIssuerId?: number | undefined;
};

export type TSearchByName = Omit<
  TSearchByDocument,
  "documentType" | "documentNumber"
> & {
  name: string;
};
