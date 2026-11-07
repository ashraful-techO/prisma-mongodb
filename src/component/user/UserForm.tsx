"use client";

import type { FormEvent } from "react";

interface UserFormProps {
  name: string;
  email: string;
  age: string;
  isEditing: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export default function UserForm({
  name,
  email,
  age,
  isEditing,
  onNameChange,
  onEmailChange,
  onAgeChange,
  onSubmit,
  onCancel,
}: UserFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 border p-5 rounded-lg mb-8 sm:grid-cols-3"
    >
      <input
        className="border p-2 w-full rounded"
        placeholder="Name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Age"
        type="number"
        min="0"
        value={age}
        onChange={(event) => onAgeChange(event.target.value)}
      />

      <div className="sm:col-span-3">
        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          {isEditing ? "Update User" : "Create User"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-3 border px-5 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
