import StatCard from "../components/cards/StatCard";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({
        workersContacted: 0,
        activeSearches: 0,
        workersHired: 0,
    });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/labour/dashboard");
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);
    return (
        <div className="bg-gray-50 p-8 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Welcome back, Employer!</h2>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value={stats.workersContacted} title="Workers Contacted" icon={<span className="text-xl">👥</span>} />
                <StatCard value={stats.activeSearches} title="Active Searches" icon={<span className="text-xl">🔍</span>} />
                <StatCard value={stats.workersHired} title="Workers Hired" icon={<span className="text-xl">✅</span>} />
                <StatCard value="2h" title="Avg Response Time" icon={<span className="text-xl">⏱️</span>} />
            </div>

            <div className="mt-10 rounded-xl border bg-white p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Find Workers</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="All">All Skills</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                    </select>

                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter area or locality"
                        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Distance: 10 km</p>
                        <input type="range" className="w-full accent-orange-500" />
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate("/find-labour")}
                        className="flex-1 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-200 text-white py-3"
                    >
                        Search Workers
                    </button>

                    <button className="rounded-lg border px-6 py-3 text-sm hover:bg-orange-500 bg-slate-200 hover:text-white transition">
                        More Filters
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="mb-4 text-lg font-semibold">Recent Searches</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer">
                        <p className="font-medium">Electrician</p>
                        <p className="text-sm text-gray-500">Noida</p>
                        <p className="mt-2 text-xs text-gray-400">2 hours ago</p>
                    </div>
                    <div className="rounded-xl border bg-white p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer">
                        <p className="font-medium">Plumber</p>
                        <p className="text-sm text-gray-500">Delhi</p>
                        <p className="mt-2 text-xs text-gray-400">Yesterday</p>
                    </div>
                    <div className="rounded-xl border bg-white p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer">
                        <p className="font-medium">Carpenter</p>
                        <p className="text-sm text-gray-500">Gurgaon</p>
                        <p className="mt-2 text-xs text-gray-400">2 days ago</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-orange-700">Hiring Tips</h2>
                <ul className="mt-4 space-y-3 text-sm text-orange-700">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Check worker ratings and reviews
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Clearly discuss work scope and payment
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Confirm availability before hiring
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Compare multiple workers before finalizing
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;