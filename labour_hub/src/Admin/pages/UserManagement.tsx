import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/Topbar";
import { users as initialUsers } from "../datas/users";

type Status = "pending" | "approved" | "blocked";
type UserType = "Labour" | "Employer";

const UserManagement = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(initialUsers);
  const [globalSearch, setGlobalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [typeFilter, setTypeFilter] = useState<UserType | "all">("all");

  
  useEffect(() => {
    const handler = (e: any) => setGlobalSearch(e.detail || "");
    window.addEventListener("admin-search", handler);
    return () => window.removeEventListener("admin-search", handler);
  }, []);

  
  const filteredUsers = users.filter((u) => {
    const q = globalSearch.toLowerCase();

    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || u.status === statusFilter;

    const matchesType =
      typeFilter === "all" || u.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  
  const updateStatus = (email: string, status: Status) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, status } : u
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-500">
              View, approve, block and manage all labour and employer accounts
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/labours")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium w-full md:w-auto"
          >
            Labour Verification →
          </button>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-4">
          <input
            placeholder="Search by name or email..."
            value={globalSearch}
            readOnly
            className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-[35%] outline-none bg-gray-50"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as any)
            }
            className="border border-gray-200 rounded-xl px-4 py-2 outline-none w-full md:w-auto"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as any)
            }
            className="border border-gray-200 rounded-xl px-4 py-2 outline-none w-full md:w-auto"
          >
            <option value="all">All Types</option>
            <option value="Labour">Labour</option>
            <option value="Employer">Employer</option>
          </select>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr
                    key={u.email}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-gray-500">
                        Registered {u.registeredAt}
                      </p>
                    </td>

                    <td>
                      <span className="border px-3 py-1 rounded-full text-xs">
                        {u.type}
                      </span>
                    </td>

                    <td className="text-xs">
                      <p>{u.email}</p>
                      <p>{u.phone}</p>
                    </td>

                    <td>
                      <span
                        className={`text-white text-xs px-4 py-1 rounded-full ${
                          u.status === "pending"
                            ? "bg-indigo-600"
                            : u.status === "approved"
                            ? "bg-green-600"
                            : "bg-orange-500"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="text-center space-x-2">
                      {u.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(u.email, "approved")
                            }
                            className="text-green-600 font-bold text-xl"
                          >
                            ✔
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(u.email, "blocked")
                            }
                            className="text-red-600 font-bold text-xl"
                          >
                            ✖
                          </button>
                        </>
                      )}

                      {u.status === "approved" && (
                        <button
                          onClick={() =>
                            updateStatus(u.email, "blocked")
                          }
                          className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full"
                        >
                          Block
                        </button>
                      )}

                      {u.status === "blocked" && (
                        <button
                          onClick={() =>
                            updateStatus(u.email, "approved")
                          }
                          className="bg-green-600 text-white text-xs px-3 py-1 rounded-full"
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;