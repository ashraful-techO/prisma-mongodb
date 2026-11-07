import type { UserQueryParams, UserQueryState } from "@/types/user";
import {
  parseLimit,
  parseNonNegativeInt,
  parsePage,
  parseSortBy,
  parseSortOrder,
} from "@/lib/user-options";

export function readUserQueryFromUrl(
  searchParams: URLSearchParams,
): UserQueryState {
  return {
    search: searchParams.get("search") ?? "",
    minAge: parseNonNegativeInt(searchParams.get("minAge")),
    maxAge: parseNonNegativeInt(searchParams.get("maxAge")),
    page: parsePage(searchParams.get("page")),
    limit: parseLimit(searchParams.get("limit")),
    sortBy: parseSortBy(searchParams.get("sortBy")),
    sortOrder: parseSortOrder(searchParams.get("sortOrder")),
  };
}

export function buildUserQueryString(query: UserQueryParams) {
  const params = new URLSearchParams();

  if (query.search) params.set("search", query.search);
  if (query.minAge !== undefined) params.set("minAge", String(query.minAge));
  if (query.maxAge !== undefined) params.set("maxAge", String(query.maxAge));
  if (query.page !== undefined) params.set("page", String(query.page));
  if (query.limit !== undefined) params.set("limit", String(query.limit));
  if (query.sortBy) params.set("sortBy", query.sortBy);
  if (query.sortOrder) params.set("sortOrder", query.sortOrder);

  return params.toString();
}

export function writeUserQueryToUrl(query: UserQueryState) {
  const queryString = buildUserQueryString(query);
  const nextUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.replaceState(null, "", nextUrl);
}
