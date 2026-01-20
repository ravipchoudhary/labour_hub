import { Worker } from "../../data/worker";

type Props = {
    worker: Worker;
};

const WorkerHeader = ({ worker }: Props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold">{worker.name}</h2>
            <p className="text-gray-500">{worker.location}</p>
            <p className="mt-1">⭐ {worker.rating}</p>
            <p className="mt-1 font-semibold">₹{worker.price} / day</p>

            <div className="flex gap-2 mt-3">
                {worker.skills.map((skill, i) => (
                    <span
                        key={i}
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
    );
};

export default WorkerHeader;