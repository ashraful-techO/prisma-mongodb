"use client";

import type { UserSortField, UserSortOrder } from "@/types/user";
import {
  PAGE_SIZES,
  SORT_FIELD_OPTIONS,
  SORT_ORDER_OPTIONS,
} from "@/lib/user-options";

interface SortControlsProps {
  sortBy: UserSortField;
  sortOrder: UserSortOrder;
  limit: number;
  onSortByChange: (value: UserSortField) => void;
  onSortOrderChange: (value: UserSortOrder) => void;
  onLimitChange: (value: number) => void;
}

export default function SortControls({
  sortBy,
  sortOrder,
  limit,
  onSortByChange,
  onSortOrderChange,
  onLimitChange,
}: SortControlsProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Sort and page size
      </label>

      <div className="grid grid-cols-3 gap-2">
        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(event) =>
            onSortByChange(event.target.value as UserSortField)
          }
          aria-label="Sort by"
        >
          {SORT_FIELD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={(event) =>
            onSortOrderChange(event.target.value as UserSortOrder)
          }
          aria-label="Sort order"
        >
          {SORT_ORDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          aria-label="Page size"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
