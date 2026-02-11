import { Worker } from "../../data/worker";

type Props = {
    worker: Worker;
    onMarkBusy: () => void;
};

const WorkerContactCard = ({ worker, onMarkBusy }: Props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow sticky top-24">
            <p className="text-2xl font-semibold mb-1">
                ₹{worker.price}
            </p>
            <p className="text-sm text-gray-500 mb-2">per day</p>

            <p
                className={`text-sm font-medium mb-4 ${worker.available ? "text-green-600" : "text-red-500"
                    }`}
            >
                {worker.available ? "🟢 Available" : "🔴 Busy"}
            </p>

          <a href={`tel:${worker.phone}`}>  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mb-3">
               📞 Call Now
            </button>
               </a>

            <a href={`sms:${worker.phone}`}>
                <button className="w-full border py-2 rounded mb-3 hover:bg-orange-500 hover:text-white">
                    💬 Send Message
                </button>
            </a>

            {worker.available && (
                <button
                    onClick={onMarkBusy}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mb-3"
                >
                    Mark Busy
                </button>
            )}

            <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="w-full text-sm text-gray-600 hover:underline">
                🔗 Share Profile
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                Usually responds within {worker.responseTime}
            </p>
        </div>
    );
};

export default WorkerContactCard;