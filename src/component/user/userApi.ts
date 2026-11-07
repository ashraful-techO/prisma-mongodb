import type {
  PaginatedUsersResponse,
  User,
  UserQueryState,
} from "@/types/user";
import { buildUserQueryString } from "./userQueryUrl";

export const USERS_QUERY_KEY = ["users"] as const;

export interface UserInput {
  name: string;
  email: string;
  age: string;
}

export async function fetchUsers(
  query: UserQueryState,
): Promise<PaginatedUsersResponse> {
  const res = await fetch(`/api/users?${buildUserQueryString(query)}`);
  const data = (await res.json()) as PaginatedUsersResponse & {
    message?: string;
  };

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to fetch users");
  }

  return data;
}

export async function createUser(input: UserInput): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as User & { message?: string };

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to create user");
  }

  return data;
}

export async function updateUser(
  id: string,
  input: UserInput,
): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as User & { message?: string };

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to update user");
  }

  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = (await res.json()) as { message?: string };
    throw new Error(data.message ?? "Failed to delete user");
  }
}
