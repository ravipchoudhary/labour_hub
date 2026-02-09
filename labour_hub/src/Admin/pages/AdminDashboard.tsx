import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopBar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RecentRegistrations from "../components/RecentRegistrations";
import SideCards from "../components/Sidecards";
import StatusBarChart from "../components/StatusBarChart";
import UserTypePieChart from "../components/UserTypePieChart";


const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    
    fetch("http://localhost:4000/admin/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
      })
      .catch(() => {
        navigate("/admin/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Users" value="2,956" badge="+12%" icon="👤" />
          <StatCard title="Active Workers" value="2500" badge="+8%" icon="👥" />
          <StatCard title="Employers" value="60" badge="+8%" icon="💼" />
          <StatCard title="Pending Approvals" value="470" badge="+8%" icon="⚠️" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <StatusBarChart />
          </div>
          <div className="lg:col-span-2">
            <UserTypePieChart />
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