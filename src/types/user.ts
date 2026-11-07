export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  age: number | null;
  createdAt: string;
}

export type UserSortField = "name" | "age" | "createdAt";

export type UserSortOrder = "asc" | "desc";

export interface UserQueryParams {
  search?: string;
  minAge?: number;
  maxAge?: number;
  page?: number;
  limit?: number;
  sortBy?: UserSortField;
  sortOrder?: UserSortOrder;
}

export interface UserQueryState {
  search: string;
  minAge?: number;
  maxAge?: number;
  page: number;
  limit: number;
  sortBy: UserSortField;
  sortOrder: UserSortOrder;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedUsersResponse {
  users: User[];
  pagination: PaginationMeta;
}
