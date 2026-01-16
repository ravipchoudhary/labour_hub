import { WorkerStatus } from "../../data/worker";

type Props = {
    name: string;
    rating: number;
    status: WorkerStatus;
    skills?: string[];
};

const WorkerCard = ({ name, rating, status, skills }: Props) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">⭐ {rating}</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{skills}</span>

                <span
                    className={`text-xs px-2 py-1 rounded ${status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                >
                    {status}
                </span>
            </div>
            <div className="flex gap-2 mt-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                    Call Now
                </button>
                <button className="border px-3 py-1 rounded hover:bg-orange-500 hover:text-white">WhatsApp</button>
            </div>
        </div>
    );
};

export default WorkerCard;