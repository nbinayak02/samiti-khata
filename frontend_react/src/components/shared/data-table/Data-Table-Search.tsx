import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { type ChangeEvent, useEffect, useState } from "react";
import type { DataTableSearchProps } from "./data-table.types";
import { ListSortAscending, ListSortDescending } from "lucide-react";

export function DataTableSearch({
  search,
  setSearch,
  searchColumn,
  setPagination,
  sortDirection,
  setSearchColumn,
  setSortDirection,
  searchableColumns,
  debounceMs = 400,
}: DataTableSearchProps) {
  const [inputValue, setInputValue] = useState(search);

  const debouncedSearch = useDebounce(inputValue, debounceMs);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    setSearch(debouncedSearch);

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }, [debouncedSearch, search, setSearch, setPagination]);

  /*
   * Keep local input synchronized if search is changed
   * externally by the parent.
   */
  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleColumnChange = (column: string | null) => {
    if (column) setSearchColumn(column);

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  };

  const selectedColumn = searchableColumns.find(
    (column) => column.id === searchColumn,
  );

  return (
    <div className="flex items-center gap-2">
      {/* search column select  */}
      <Select value={searchColumn} onValueChange={handleColumnChange}>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Search by">
            {searchableColumns.find((c) => c.id === searchColumn)?.label}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {searchableColumns.map((column) => (
            <SelectItem key={column.id} value={column.id}>
              {column.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* search value  */}
      <Input
        value={inputValue}
        onChange={handleSearchChange}
        disabled={searchColumn === ""}
        placeholder={
          selectedColumn
            ? `Search ${selectedColumn.label.toLowerCase()}`
            : "Select Search Key to Search"
        }
        className="max-w-sm"
      />

      <Select value={sortDirection} onValueChange={setSortDirection}>
        <SelectTrigger className="w-30">
          {sortDirection === "asc" ? (
            <ListSortAscending />
          ) : (
            <ListSortDescending />
          )}
          <SelectValue placeholder="Sort By">
            {sortDirection === "asc" ? "Oldest" : "Newest"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem key={"asc"} value={"asc"}>
            Oldest
          </SelectItem>
          <SelectItem key={"desc"} value={"desc"}>
            Newest
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
