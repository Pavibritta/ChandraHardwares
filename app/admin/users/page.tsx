"use client";
import React, { useEffect, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

type User = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const [search, setSearch] = useState("");
const filteredUsers = users.filter((user) => {
  const name = user.fullName || "";
  const email = user.email || "";

  return (
    name.toLowerCase().includes(search.toLowerCase()) ||
    email.toLowerCase().includes(search.toLowerCase())
  );
});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([data]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  
    return (
  <div className="mt-20 bg-gray-50 min-h-screen px-4 py-6">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold text-primary">Users</h1>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
        />
        <input
  type="text"
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary outline-none"
/>
      </div>
    </div>

    {/* Table Card */}
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">

      <table className="w-full text-sm text-left">

        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Joined</th>
            
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-gray-600">
          {filteredUsers.map((user) => (
            <tr
              key={user._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium">
                {user.fullName}
              </td>

              <td className="px-4 py-3">
                {user.email}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </td>

              {/* Date */}
              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

             
            </tr>
          ))}
        </tbody>

      </table>

      {/* Empty State */}
     {filteredUsers.length === 0 && (
  <p className="text-center py-6 text-gray-500">
    No users found
  </p>
)}
    </div>
  </div>
);
  
};

export default Users;