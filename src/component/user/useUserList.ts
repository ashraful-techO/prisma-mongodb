"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  UserQueryState,
  UserSortField,
  UserSortOrder,
} from "@/types/user";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  parseNonNegativeInt,
} from "@/lib/user-options";
import { fetchUsers, USERS_QUERY_KEY } from "./userApi";
import {
  readUserQueryFromUrl,
  writeUserQueryToUrl,
} from "./userQueryUrl";

const EMPTY_QUERY: UserQueryState = {
  search: "",
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  sortBy: DEFAULT_SORT_BY,
  sortOrder: DEFAULT_SORT_ORDER,
};

export function useUserList() {
  const [query, setQuery] = useState<UserQueryState>(EMPTY_QUERY);
  const [searchInput, setSearchInput] = useState("");
  const [minAgeInput, setMinAgeInput] = useState("");
  const [maxAgeInput, setMaxAgeInput] = useState("");
  const [urlReady, setUrlReady] = useState(false);

  useEffect(() => {
    const urlQuery = readUserQueryFromUrl(
      new URLSearchParams(window.location.search),
    );

    setQuery(urlQuery);
    setSearchInput(urlQuery.search);
    setMinAgeInput(urlQuery.minAge !== undefined ? String(urlQuery.minAge) : "");
    setMaxAgeInput(urlQuery.maxAge !== undefined ? String(urlQuery.maxAge) : "");
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (urlReady) writeUserQueryToUrl(query);
  }, [query, urlReady]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery((current) =>
        current.search === searchInput
          ? current
          : { ...current, search: searchInput, page: DEFAULT_PAGE },
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const usersQuery = useQuery({
    queryKey: [...USERS_QUERY_KEY, query],
    queryFn: () => fetchUsers(query),
    enabled: urlReady,
  });

  const users = usersQuery.data?.users ?? [];
  const totalRecords = usersQuery.data?.pagination.totalRecords ?? 0;
  const totalPages = usersQuery.data?.pagination.totalPages ?? 0;
  const loading = usersQuery.isPending || usersQuery.isFetching;
  const error = usersQuery.isError
    ? usersQuery.error instanceof Error
      ? usersQuery.error.message
      : "Failed to fetch users"
    : null;

  const applyFilters = () => {
    const minAge = parseNonNegativeInt(minAgeInput);
    const maxAge = parseNonNegativeInt(maxAgeInput);

    setQuery((current) =>
      current.minAge === minAge && current.maxAge === maxAge
        ? current
        : { ...current, minAge, maxAge, page: DEFAULT_PAGE },
    );
  };

  const resetFilters = () => {
    setMinAgeInput("");
    setMaxAgeInput("");

    setQuery((current) =>
      current.minAge === undefined && current.maxAge === undefined
        ? current
        : { ...current, minAge: undefined, maxAge: undefined, page: DEFAULT_PAGE },
    );
  };

  const clearSearch = () => {
    setSearchInput("");

    setQuery((current) =>
      current.search === ""
        ? current
        : { ...current, search: "", page: DEFAULT_PAGE },
    );
  };

  const changeSortBy = (sortBy: UserSortField) => {
    setQuery((current) =>
      current.sortBy === sortBy
        ? current
        : { ...current, sortBy, page: DEFAULT_PAGE },
    );
  };

  const changeSortOrder = (sortOrder: UserSortOrder) => {
    setQuery((current) =>
      current.sortOrder === sortOrder
        ? current
        : { ...current, sortOrder, page: DEFAULT_PAGE },
    );
  };

  const changeLimit = (limit: number) => {
    setQuery((current) =>
      current.limit === limit
        ? current
        : { ...current, limit, page: DEFAULT_PAGE },
    );
  };

  const goToPage = (page: number) => {
    const lastPage = Math.max(totalPages, 1);
    const nextPage = Math.min(Math.max(page, 1), lastPage);

    setQuery((current) =>
      current.page === nextPage ? current : { ...current, page: nextPage },
    );
  };

  return {
    query,
    users,
    totalRecords,
    totalPages,
    loading,
    error,
    searchInput,
    minAgeInput,
    maxAgeInput,
    setSearchInput,
    setMinAgeInput,
    setMaxAgeInput,
    applyFilters,
    resetFilters,
    clearSearch,
    changeSortBy,
    changeSortOrder,
    changeLimit,
    goToPage,
    refetchUsers: usersQuery.refetch,
  };
}
