"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  updateUser,
  USERS_QUERY_KEY,
} from "./userApi";
import type { UserInput } from "./userApi";

export function useUserMutations() {
  const queryClient = useQueryClient();

  const refreshUsers = () =>
    queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: refreshUsers,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UserInput }) =>
      updateUser(id, input),
    onSuccess: refreshUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: refreshUsers,
  });

  return { createMutation, updateMutation, deleteMutation };
}
