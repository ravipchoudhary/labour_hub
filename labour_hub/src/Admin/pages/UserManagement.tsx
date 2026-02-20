import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/Topbar";

type Status = "pending" | "approved" | "blocked";
type UserType = "Labour" | "Employer";

const UserManagement = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [typeFilter, setTypeFilter] = useState<UserType | "all">("all");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/admin/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role: typeFilter,
            status: statusFilter,
            search: globalSearch,
          },
        }
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, typeFilter]);

  const updateStatus = async (id: string, status: Status) => {
    try {
      await axios.put(
        `http://localhost:4000/admin/all-users/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.log("Update error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 space-y-8">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-500">
              View, approve, block and manage all labour and employer accounts
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/labours")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium"
          >
            Labour Verification →
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-4">
          <input
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyUp={fetchUsers}
            placeholder="Search by name or email..."
            className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-[35%] outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border border-gray-200 rounded-xl px-4 py-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="border border-gray-200 rounded-xl px-4 py-2"
          >
            <option value="all">All Types</option>
            <option value="Labour">Labour</option>
            <option value="Employer">Employer</option>
          </select>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr className="h-[56px]">
                  <th className="px-6 text-left w-[20%]">User</th>
                  <th className="px-6 text-center w-[20%]">Type</th>
                  <th className="px-6 text-left w-[20%]">Contact</th>
                  <th className="px-6 text-center w-[20%]">Status</th>
                  <th className="px-6 text-center w-[20%]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t h-[68px] hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/users/${u._id}`)}
                  >
                    <td className="px-6">
                      <div>
                        <span className="font-medium">{u.name}</span>
                        <div className="text-xs text-gray-500">
                          Registered{" "}
                          {new Date(u.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 text-center">
                      <span className="inline-flex min-w-[90px] h-[28px] border rounded-full text-xs items-center justify-center">
                        {u.role}
                      </span>
                    </td>

                    <td className="px-6 text-xs">
                      <div>
                        <div>{u.email}</div>
                        <div className="text-gray-500">{u.phone}</div>
                      </div>
                    </td>

                    <td className="px-6 text-center">
                      <span
                        className={`inline-flex min-w-[110px] h-[28px] text-white text-xs rounded-full items-center justify-center ${u.status === "pending"
                            ? "bg-indigo-600"
                            : u.status === "approved"
                              ? "bg-green-600"
                              : "bg-orange-500"
                          }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="px-6 text-center">
                      <div className="flex justify-center gap-3">

                        {u.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(u._id, "approved")
                              }
                              className="text-green-600 font-bold text-xl"
                            >
                              ✔
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(u._id, "blocked")
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
                              updateStatus(u._id, "blocked")
                            }
                            className="bg-orange-500 text-white text-xs px-4 py-1 rounded-full"
                          >
                            Block
                          </button>
                        )}

                        {u.status === "blocked" && (
                          <button
                            onClick={() =>
                              updateStatus(u._id, "approved")
                            }
                            className="bg-green-600 text-white text-xs px-4 py-1 rounded-full"
                          >
                            Unblock
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
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