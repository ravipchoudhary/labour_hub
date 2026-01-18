import TopBar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RecentRegistrations from "../components/RecentRegistrations";
import SideCards from "../components/Sidecards";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1500px] mx-auto px-4 lg:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Users" value="2,456" badge ="+12%" icon="👤" />
          <StatCard title="Active Workers" value="1800" badge ="+8%" icon="👥" />
          <StatCard title="Employers" value="632" badge ="+8%" icon="💼" />
          <StatCard title="Pending Approvals" value="47" badge ="+8%" icon="⚠️" />
        </div>

        {/* Main Section */}
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