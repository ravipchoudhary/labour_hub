import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");


    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetch("http://localhost:4000/api/labour")
      .then((res) => res.json())
      .then((data) => {
        setTotalUsers(data.length);


        const approved = data.filter((item: any) => item.status === "approved");
        const pending = data.filter((item: any) => item.status === "pending");
        const employerUsers = data.filter(
          (item: any) => item.role === "employer"
        );


        setActiveWorkers(approved.length);
        setPendingApprovals(pending.length);
        setEmployers(employerUsers.length);
        setBlockedUsers(employerUsers.length - approved.length);
        setLoading(false);
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, [navigate]);


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


      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Users" value={totalUsers} badge="+12%" icon="👤" />
          <StatCard title="Active Workers" value={activeWorkers} badge="+8%" icon="👥" />
          <StatCard title="Employers" value={employers} badge="+5%" icon="💼" />
          <StatCard title="Pending Approvals" value={pendingApprovals} badge="+4%" icon="⚠️" />
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
    </div>
  );
};


export default AdminDashboard;