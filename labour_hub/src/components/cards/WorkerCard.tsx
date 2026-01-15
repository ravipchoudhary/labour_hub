type Props = {
    name: string;
    rating: number;
    status: "Available" | "Busy";
};

const WorkerCard = ({ name, rating, status }: Props) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">⭐ {rating}</p>

            <span
                className={`text-xs px-2 py-1 rounded ${status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
            >
                {status}
            </span>

            <div className="flex gap-2 mt-4">
                <button className="bg-orange-500 text-white px-3 py-1 rounded">
                    Call Now
                </button>
                <button className="border px-3 py-1 rounded">WhatsApp</button>
            </div>
        </div>
    );
};

export default WorkerCard;