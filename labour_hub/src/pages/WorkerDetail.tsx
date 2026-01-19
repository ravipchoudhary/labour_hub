import { useParams } from "react-router-dom";
import { workers } from "../data/worker";
import { useNavigate } from "react-router-dom";


const WorkerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const worker = workers.find((w) => w.id === Number(id));

    if (!worker) {
        return <div className="p-8">Worker not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-lg text-blue-700 hover:underline"
                >
                    ← Back to Find Labour
                </button>
                <p className="text-sm text-gray-500 mb-4">
                    Home / Find Labour / {worker.name}
                </p>
            <div className="max-w-3xl bg-white rounded-xl p-6 shadow">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{worker.name}</h2>
                    <span
                        className={`px-3 py-1 text-sm rounded-full ${worker.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}>
                        {worker.available ? "Available" : "Busy"}
                    </span>
                </div>

                <p className="mt-2 text-gray-600">⭐ {worker.rating}</p>
                <p className="mt-1 text-xl font-semibold">₹{worker.price} / day</p>
                <p className="mt-1 text-gray-500">{worker.location}</p>

                <div className="flex gap-2 mt-4">
                    {worker.skills.map((skill: string, index: number) => (
                        <span
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded text-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 mt-6">
                    <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
                        Call Now
                    </button>
                    <button className="border px-5 py-2 rounded hover:bg-orange-500 hover:text-white">
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkerDetail;