import StatCard from "../components/cards/StatCard";

const Dashboard = () => {
    return (
        <div className="bg-gray-50 p-8 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">
                Welcome back, Employer!
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Workers Contacted" value="24" />
                <StatCard title="Active Searches" value="3" />
                <StatCard title="Workers Hired" value="12" />
                <StatCard title="Avg Response Time" value="2h" />
            </div>
            <div className="mt-10 rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold">Find Workers</h2>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <select className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none">
                        <option>All Skills</option>
                        <option>Electrician</option>
                        <option>Plumber</option>
                        <option>Carpenter</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Enter area or locality"
                        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                    />

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Distance: 10 km</p>
                        <input type="range" className="w-full" />
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <button className="flex-1 rounded-lg bg-orange-500 hover:bg-orange-600 transition py-3 text-sm font-medium text-white">
                        Search Workers
                    </button>

                    <button className="rounded-lg border px-6 py-3 text-sm
                    hover:bg-orange-500 bg-slate-200 hover:text-white">
                        More Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;