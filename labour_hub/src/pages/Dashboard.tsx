import StatCard from "../components/cards/StatCard";
import { useState } from "react"
import { workers } from "../data/worker";
// import WorkerCard from "../components/cards/WorkerCard";
const Dashboard = () => {
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [location, setLocation] = useState("");
    const filteredWorkers = workers.filter((worker) => {
        const skillMatch =
            selectedSkill === "All" || worker.skills.includes(selectedSkill);

        const locationMatch = worker.location
            .toLowerCase()
            .includes(location.toLowerCase());

        return skillMatch && locationMatch;
    });
    return (
        <div className="bg-gray-00 p-8 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">
                Welcome back, Employer!
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value="24" title="Workers Contacted" />
                <StatCard title="Active Searches" value="3" />
                <StatCard title="Workers Hired" value="12" />
                <StatCard title="Avg Response Time" value="2h" />
            </div>
            <div className="mt-10 rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold">Find Workers</h2>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
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
                        className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:outline-none"
                    />

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Distance: 10 km</p>
                        <input type="range" className="w-full" />
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <button className="flex-1 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-200 text-white">
                        Search Workers
                    </button>

                    <button className="rounded-lg border px-6 py-3 text-sm
                    hover:bg-orange-500 bg-slate-200 hover:text-white">
                        More Filters
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="mb-4 text-lg font-semibold">Recent Searches</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-4 hover:shadow-md transition">
                        <p className="font-medium">Electrician</p>
                        <p className="text-sm text-gray-500">Noida</p>
                        <p className="mt-2 text-xs text-gray-400">2 hours ago</p>
                    </div>
                    <div className="rounded-xl border bg-white p-4 hover:shadow-md transition">
                        <p className="font-medium">Plumber</p>
                        <p className="text-sm text-gray-500">Delhi</p>
                        <p className="mt-2 text-xs text-gray-400">Yesterday</p>
                    </div>
                    <div className="rounded-xl border bg-white p-4 hover:shadow-md transition">
                        <p className="font-medium">Carpenter</p>
                        <p className="text-sm text-gray-500">Gurgaon</p>
                        <p className="mt-2 text-xs text-gray-400">2 days ago</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 rounded-xl bg-orange-50 p-6">
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
            <div className="mt-10">
                {/* <h2 className="mb-4 text-lg font-semiblod"> Available Workers </h2> */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* {filteredWorkers.map((worker) => (
                        // <WorkerCard
                        //     key={worker.id}
                        //     name={worker.name}
                        //     skills={worker.skills}
                        //     location={worker.location}
                        //     rating={worker.rating}
                        //     available={worker.available}
                        // />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;