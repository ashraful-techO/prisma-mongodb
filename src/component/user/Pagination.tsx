"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalRecords: number;
  visibleCount: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  totalRecords,
  visibleCount,
  loading,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
      <p className="text-sm text-gray-500">
        Showing {visibleCount} of {totalRecords} records
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={loading || page <= 1}
          className="border px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {Math.max(totalPages, 1)}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={loading || totalPages === 0 || page >= totalPages}
          className="border px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
