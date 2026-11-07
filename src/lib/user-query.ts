import { Prisma } from "@prisma/client";
import type { PaginationMeta, UserQueryState } from "@/types/user";
import {
  parseLimit,
  parseNonNegativeInt,
  parsePage,
  parseSortBy,
  parseSortOrder,
} from "@/lib/user-options";

export function parseUserQuery(searchParams: URLSearchParams): UserQueryState {
  return {
    search: searchParams.get("search")?.trim() ?? "",
    minAge: parseNonNegativeInt(searchParams.get("minAge")),
    maxAge: parseNonNegativeInt(searchParams.get("maxAge")),
    page: parsePage(searchParams.get("page")),
    limit: parseLimit(searchParams.get("limit")),
    sortBy: parseSortBy(searchParams.get("sortBy")),
    sortOrder: parseSortOrder(searchParams.get("sortOrder")),
  };
}

function buildAgeFilter(minAge?: number, maxAge?: number) {
  if (minAge === undefined && maxAge === undefined) return undefined;

  const filter: Prisma.IntNullableFilter<"User"> = {};

  if (minAge !== undefined) filter.gte = minAge;
  if (maxAge !== undefined) filter.lte = maxAge;

  return filter;
}

export function buildUserWhere(query: UserQueryState): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {};

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { email: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const ageFilter = buildAgeFilter(query.minAge, query.maxAge);
  if (ageFilter) where.age = ageFilter;

  return where;
}

export function buildUserOrderBy(
  query: UserQueryState,
): Prisma.UserOrderByWithRelationInput {
  return { [query.sortBy]: query.sortOrder };
}

export function buildPagination(
  page: number,
  limit: number,
  totalRecords: number,
): PaginationMeta {
  const totalPages = totalRecords === 0 ? 0 : Math.ceil(totalRecords / limit);

  return {
    page,
    limit,
    totalRecords,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
