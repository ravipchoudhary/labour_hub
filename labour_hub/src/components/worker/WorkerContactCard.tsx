import { Worker } from "../../data/worker";

type Props = {
    worker: Worker;
};

const WorkerContactCard = ({ worker }: Props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow sticky top-24">
            <p className="text-2xl font-semibold mb-1">
                ₹{worker.price}
            </p>
            <p className="text-sm text-gray-500 mb-4">per day</p>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mb-3">
                📞 Call Now
            </button>

            <button className="w-full border py-2 rounded mb-3 hover:bg-orange-500 hover:text-white">
                💬 Send Message
            </button>

            <button className="w-full text-sm text-gray-600 hover:underline">
                🔗 Share Profile
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                Usually responds within {worker.responseTime}
            </p>
        </div>
    );
};

export default WorkerContactCard;