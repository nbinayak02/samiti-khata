import { useState, type ReactNode } from "react";
import type { RowData } from "@tanstack/react-table";
// import { DataTableContext } from "./data-table.context";

type Props= {
  children: ReactNode;
 
};

export default function DataTableProvider<T extends RowData>({
  children,
}: Props) {

//   const [tableState, setTableState] = useState<DataTableContext<T>>();



//   return (
//     <DataTableContext.Provider value={{}}>{children}</DataTableContext.Provider>
//   );
}
