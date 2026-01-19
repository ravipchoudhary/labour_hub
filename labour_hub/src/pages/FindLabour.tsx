import WorkerCard from "../components/cards/WorkerCard";
import { workers } from "../data/worker";
import { useState } from "react";
const FindLabour = () => {
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [location, setLocation] = useState("");
    const filteredWorkers = workers.filter((worker) => {
        const skillMatch = selectedSkill === "All" || worker.skills.includes(selectedSkill);

        const locationMatch = worker.location
            .toLowerCase()
            .includes(location.toLowerCase());

        return skillMatch && locationMatch;
    });
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
                <h1 className="text-3xl font-semibold mb-4">Find Skilled Workers</h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="px-4 py-2 rounded text-black"
                    >
                        <option value="All">All Skills</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="px-4 py-2 rounded text-black flex-1"
                    />

                    <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded font-semibold transition">
                        Search
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker) => (
                    <WorkerCard
                        key={worker.id}
                        id={worker.id}
                        name={worker.name}
                        rating={worker.rating}
                        available={worker.available}
                        skills={worker.skills}
                        location={worker.location}
                        price={worker.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default FindLabour;