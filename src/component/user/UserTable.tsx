"use client";

import type { User } from "@/types/user";

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

function UserRow({ user, onEdit, onDelete }: UserRowProps) {
  return (
    <tr className="align-top">
      <td className="px-4 py-3 font-medium">{user.name}</td>
      <td className="px-4 py-3 text-gray-600">{user.email}</td>
      <td className="px-4 py-3">{user.age ?? "N/A"}</td>
      <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(user.id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({
  users,
  loading,
  error,
  onRetry,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Age</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">
              Created
            </th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center">
                <span className="inline-flex items-center gap-2 text-gray-500">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                  Loading users...
                </span>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center">
                <p className="mb-3 text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="border px-4 py-2 rounded"
                >
                  Try again
                </button>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                No users match your search or filters.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
