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
  committeeId?: string | undefined;
  documentType?: string | undefined;
  documentNumber?: string | undefined;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  billIssuerId?: number | undefined;
};

export type TSearchByName = Omit<
  TSearchByDocument,
  "documentType" | "documentNumber"
> & {
  name: string | undefined;
};

export type TSearchByDocumentWhereClause = {
  committeeId?: number;
  billNumber?: string;
  bookNumber?: string;
  date?: {
    gte?: Date;
    lte?: Date;
  };
  billIssuerId?: number;
};
