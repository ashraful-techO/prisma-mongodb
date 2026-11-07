import type { UserSortField, UserSortOrder } from "@/types/user";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_SORT_BY: UserSortField = "createdAt";
export const DEFAULT_SORT_ORDER: UserSortOrder = "desc";

export const PAGE_SIZES = [10, 20, 50];

export const SORT_FIELD_OPTIONS: { value: UserSortField; label: string }[] = [
  { value: "createdAt", label: "Created Date" },
  { value: "name", label: "Name" },
  { value: "age", label: "Age" },
];

export const SORT_ORDER_OPTIONS: { value: UserSortOrder; label: string }[] = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export function parsePositiveInt(value: string | null, fallback: number) {
  if (value === null || value.trim() === "") return fallback;

  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export function parseNonNegativeInt(value: string | null) {
  if (value === null || value.trim() === "") return undefined;

  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : undefined;
}

export function isSortField(value: string | null): value is UserSortField {
  return SORT_FIELD_OPTIONS.some((option) => option.value === value);
}

export function isSortOrder(value: string | null): value is UserSortOrder {
  return SORT_ORDER_OPTIONS.some((option) => option.value === value);
}

export function isPageSize(value: number) {
  return PAGE_SIZES.includes(value);
}

export function parsePage(value: string | null) {
  return parsePositiveInt(value, DEFAULT_PAGE);
}

export function parseLimit(value: string | null) {
  const limit = parsePositiveInt(value, DEFAULT_LIMIT);
  return isPageSize(limit) ? limit : DEFAULT_LIMIT;
}

export function parseSortBy(value: string | null) {
  return isSortField(value) ? value : DEFAULT_SORT_BY;
}

export function parseSortOrder(value: string | null) {
  return isSortOrder(value) ? value : DEFAULT_SORT_ORDER;
}
