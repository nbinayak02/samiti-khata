export type TSearchByDocument = {
  committeeId?: string | undefined;
  billNumber?: string | undefined;
  bookNumber?: string | undefined;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  billIssuerId?: number | undefined;
};

export type TSearchByName = Omit<
  TSearchByDocument,
  "billNumber" | "bookNumber"
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
