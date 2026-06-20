import { Button } from "./ui/button";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPreviousClick: () => void;
  setPreviousDisabled: boolean;
  onNextClick: () => void;
  setNextDisabled: boolean;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPreviousClick,
  setPreviousDisabled,
  onNextClick,
  setNextDisabled,
}: PaginationComponentProps) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <p className="text-muted-foreground">
        Showing {currentPage} of {totalPages} pages.
      </p>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousClick}
          disabled={setPreviousDisabled}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextClick}
          disabled={setNextDisabled}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
