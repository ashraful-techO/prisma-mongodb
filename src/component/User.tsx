"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  age: number | null;
};

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // GET USERS
  const getUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // CREATE / UPDATE USER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, email, age };

    const url = editingId ? `/api/users/${editingId}` : "/api/users";

    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Something went wrong!");
      return;
    }

    setName("");
    setEmail("");
    setAge("");
    setEditingId(null);

    getUsers();
  };

  // EDIT USER
  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age?.toString() || "");
  };

  // DELETE USER
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      getUsers();
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-5 rounded-lg mb-8"
      >
        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          {editingId ? "Update User" : "Create User"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Users ({users.length})</h2>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">Age: {user.age ?? "N/A"}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
