// import { WorkerStatus } from "../../data/worker";

type Props = {
    name: string;
    skills: string[];
    location: string;
    rating: number;
    available: boolean;

};

const WorkerCard = ({ name, rating, available, location, skills }: Props) => {
    return (
        <div className="bg-white p-5 rounded-xl border 
            hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {available ? "Available" : "Busy"}
                </span>
            </div>
            <p className="text-sm text-gray-500">⭐ {rating}</p>
            <p className="text-sm text-gray-500">{location}</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{skills}</span>


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