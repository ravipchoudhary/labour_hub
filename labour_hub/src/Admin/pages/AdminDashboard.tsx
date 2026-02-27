import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import TopBar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RecentRegistrations from "../components/RecentRegistrations";
import SideCards from "../components/Sidecards";
import StatusBarChart from "../components/StatusBarChart";
import UserTypePieChart from "../components/UserTypePieChart";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeWorkers, setActiveWorkers] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState(0);

  const token = localStorage.getItem("token");

  const fetchDashboard = useCallback(async () => {
    try {
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const [adminRes, labourRes] = await Promise.all([
        fetch("http://localhost:4000/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/api/labour", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!adminRes.ok || !labourRes.ok) {
        navigate("/admin/login");
        return;
      }

      const adminData = await adminRes.json();
      const labourData = await labourRes.json();

      if (!adminData.success || !Array.isArray(labourData)) {
        navigate("/admin/login");
        return;
      }

      const total = labourData.length;
      const approved = labourData.filter((u: any) => u.status === "accept");
      const pending = labourData.filter((u: any) => u.status === "pending");
      const rejected = labourData.filter((u: any) => u.status === "reject");
      const employerUsers = labourData.filter((u: any) => u.role === "employer");

      setTotalUsers(total);
      setActiveWorkers(approved.length);
      setPendingApprovals(pending.length);
      setBlockedUsers(rejected.length);
      setEmployers(employerUsers.length);

      setLoading(false);
    } catch (error) {
      console.log("Dashboard error:", error);
      navigate("/admin/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div
            onClick={() => navigate("/admin/users")}
            className="cursor-pointer"
          
          >
            <StatCard
              title="Total Users"
              value={totalUsers}
              badge="100%"
              icon="👤"
            />
          </div>

          <div onClick={() => navigate("/admin/users?status=accept&role=labour")} className="cursor-pointer">
            <StatCard
              title="Active Workers"
              value={activeWorkers}
              badge={`${totalUsers ? Math.round((activeWorkers / totalUsers) * 100) : 0}%`}
              icon="👥"
            />
          </div>

          <div onClick={() => navigate("/admin/users?status=accept&role=employer")} className="cursor-pointer">
            <StatCard
              title="Employers"
              value={employers}
              badge={`${totalUsers ? Math.round((employers / totalUsers) * 100) : 0}%`}
              icon="💼"
            />
          </div>

          <div onClick={() => navigate("/admin/users?status=pending")} className="cursor-pointer">
            <StatCard
              title="Pending Approvals"
              value={pendingApprovals}
              badge={`${totalUsers ? Math.round((pendingApprovals / totalUsers) * 100) : 0}%`}
              icon="⚠️"
            />
          </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <StatusBarChart
              active={activeWorkers}
              pending={pendingApprovals}
              blocked={blockedUsers}
              total={totalUsers}
            />
          </div>

          <div className="lg:col-span-2">
            <UserTypePieChart
              labour={totalUsers - employers}
              employers={employers}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentRegistrations />
          </div>
          <SideCards />
        </div>

      </div>
  );
};

export default AdminDashboard;