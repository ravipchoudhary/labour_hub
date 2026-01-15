import StatCard from "../components/cards/StatCard";

const Dashboard = () => {
    return (
        <div className="bg-gray-50 p-8 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">
                Welcome back, Employer!
            </h2>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard title="Workers Contacted" value="24" />
                <StatCard title="Active Searches" value="3" />
                <StatCard title="Workers Hired" value="12" />
                <StatCard title="Avg Response Time" value="2h" />
            </div>
        </div>
    );
};

export default Dashboard;