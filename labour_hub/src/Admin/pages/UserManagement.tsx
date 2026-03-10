import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/Topbar";
import { ChevronDown } from "lucide-react";

type Status = "pending" | "accepted" | "rejected";

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const statusFromUrl = searchParams.get("status") || "all";
  const roleFromUrl = searchParams.get("role") || "all";

  const [users, setUsers] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/all-users", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          status: statusFromUrl !== "all" ? statusFromUrl : undefined,
          role: roleFromUrl !== "all" ? roleFromUrl : undefined,
          search: searchFromUrl || undefined,
        },
      });
      if (res.data.success) setUsers(res.data.users);
    } catch (error) {
      console.log("Fetch error", error);
    }
  }, [token, statusFromUrl, roleFromUrl, searchFromUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateStatus = async (id: string, status: Status) => {
    try {
      await axios.put(`http://localhost:4000/admin/all-users/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.log("Update error", error);
    }
  };

  const handleStatusChange = (value: string) => {
    navigate(`/admin/users?status=${value}&role=${roleFromUrl}`);
    setOpenDropdown(null);
  };

  const handleRoleChange = (value: string) => {
    navigate(`/admin/users?status=${statusFromUrl}&role=${value}`);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const CustomSelect = ({ label, value, options, onChange, id }: any) => {
    const isOpen = openDropdown === id;
    const selectedLabel = options.find((o: any) => o.val === value)?.label;

    return (
      <div className="relative w-full md:w-48" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="w-full bg-[#F3F0F2] border-b-2 border-blue-800 rounded-t-lg px-4 py-1 text-left flex flex-col transition-all hover:bg-gray-100"
        >
          <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
            {label}
          </span>
          <div className="flex justify-between items-center mt-0.5">
            <span className="text-gray-900 font-medium">{selectedLabel}</span>
            <ChevronDown size={18} className={`text-gray-800 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden py-1">
            {options.map((opt: any) => (
              <button
                key={opt.val}
                onClick={() => onChange(opt.val)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${value === opt.val ? "text-blue-700 bg-blue-50 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 space-y-8">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-500">View, approve, block and manage all labour and employer accounts</p>
          </div>
          <button onClick={() => navigate("/admin/labours")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium">
            Labour Verification →
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-full md:w-[35%]">
            <input
              defaultValue={searchFromUrl}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(
                    `/admin/users?search=${(e.target as HTMLInputElement).value}&status=${statusFromUrl}&role=${roleFromUrl}`
                  );
                }
              }}
              placeholder="Search by name or email..."
              className="border border-gray-300 rounded-xl px-4 py-3 w-full outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          <CustomSelect
            id="status"
            label="Status"
            value={statusFromUrl}
            onChange={handleStatusChange}
            options={[
              { val: "all", label: "All Status" },
              { val: "pending", label: "Pending" },
              { val: "accepted", label: "Approved" },
              { val: "rejected", label: "Rejected" },
            ]}
          />

          <CustomSelect
            id="role"
            label="User type"
            value={roleFromUrl}
            onChange={handleRoleChange}
            options={[
              { val: "all", label: "All Types" },
              { val: "labour", label: "Labour" },
              { val: "employee", label: "Employer" },
            ]}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm border-collapse table">
              <thead className="bg-gray-50 text-gray-600 border-b">
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
                  <tr key={u._id} className="border-t h-[68px] hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/users/${u._id}`)}>
                    <td className="px-6">
                      <span className="font-medium text-gray-900">{u.name}</span>
                      <div className="text-[11px] text-gray-400">Registered {new Date(u.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 text-center">
                      <span className="px-3 py-1 border rounded-full text-[11px] uppercase font-bold tracking-tight text-gray-600">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 text-xs">
                      <div className="font-medium">{u.email}</div>
                      <div className="text-gray-500">{u.phone}</div>
                    </td>
                    <td className="px-6 text-center">
                      <span className={`inline-flex px-4 py-1 text-white text-[11px] font-bold uppercase rounded-full ${u.status === "pending" ? "bg-indigo-600" : u.status === "accepted" ? "bg-green-600" : "bg-orange-500"
                        }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">

                        {u.role === "labour" && u.ignoredJobs === 0 && u.status === "accepted" && (
                          <span className="bg-green-500 text-white text-medium font-bold px-3 py-1 rounded-full">
                            Active User
                          </span>
                        )}

                        {u.role === "labour" && u.ignoredJobs === 0 && u.status === "pending" && (
                          <span className="bg-indigo-500 text-white text-medium px-3 py-1 rounded-full">
                            Awaiting
                          </span>
                        )}

                        {u.role === "labour" && u.ignoredJobs === 1 && (
                          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                            1 Missed Job
                          </span>
                        )}

                        {u.role === "labour" && u.ignoredJobs === 2 && (
                          <button
                            onClick={() => axios.post("http://localhost:4000/admin/send-reminder-bulk")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-1 rounded-full"
                          >
                            Reminder
                          </button>
                        )}

                        {u.role === "labour" && u.ignoredJobs === 3 && (
                          <button
                            onClick={() => axios.post("http://localhost:4000/admin/send-warning-bulk")}
                            className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-1 rounded-full"
                          >
                            Warning
                          </button>
                        )}

                        {u.role === "labour" && u.ignoredJobs >= 4 && (
                          <button
                            onClick={() => axios.put(`http://localhost:4000/admin/block-labour/${u._id}`)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1 rounded-full"
                          >
                            Block
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && <div className="text-center py-20 text-gray-400 font-medium">No users found matching filters.</div>}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;