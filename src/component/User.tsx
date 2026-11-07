"use client";

import { useState } from "react";
import type { User as UserType } from "@/types/user";
import { useUserList } from "./user/useUserList";
import { useUserMutations } from "./user/useUserMutations";
import UserForm from "./user/UserForm";
import SearchBar from "./user/SearchBar";
import SortControls from "./user/SortControls";
import AgeFilters from "./user/AgeFilters";
import UserTable from "./user/UserTable";
import Pagination from "./user/Pagination";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
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
    refetchUsers,
  } = useUserList();

  const { createMutation, updateMutation, deleteMutation } = useUserMutations();

  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const input = { name, email, age };

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, input });
      } else {
        await createMutation.mutateAsync(input);

        if (query.page !== 1) {
          goToPage(1);
        }
      }

      resetForm();
    } catch {
      alert("Something went wrong!");
    }
  };

  const handleEdit = (user: UserType) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age?.toString() ?? "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <UserForm
        name={name}
        email={email}
        age={age}
        isEditing={editingId !== null}
        onNameChange={setName}
        onEmailChange={setEmail}
        onAgeChange={setAge}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <section className="border rounded-lg p-4 mb-6 space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onClear={clearSearch}
          />

          <SortControls
            sortBy={query.sortBy}
            sortOrder={query.sortOrder}
            limit={query.limit}
            onSortByChange={changeSortBy}
            onSortOrderChange={changeSortOrder}
            onLimitChange={changeLimit}
          />
        </div>

        <AgeFilters
          minAge={minAgeInput}
          maxAge={maxAgeInput}
          onMinAgeChange={setMinAgeInput}
          onMaxAgeChange={setMaxAgeInput}
          onApply={applyFilters}
          onReset={resetFilters}
        />
      </section>

      <h2 className="text-xl font-semibold mb-4">Users ({totalRecords})</h2>

      <UserTable
        users={users}
        loading={loading}
        error={error}
        onRetry={refetchUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        page={query.page}
        totalPages={totalPages}
        totalRecords={totalRecords}
        visibleCount={users.length}
        loading={loading}
        onPrevious={() => goToPage(query.page - 1)}
        onNext={() => goToPage(query.page + 1)}
      />
    </main>
  );
}
