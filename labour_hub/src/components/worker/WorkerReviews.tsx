import { Worker } from "../../data/worker";

type Props = {
    worker: Worker;
};

const WorkerReviews = ({ worker }: Props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                    Reviews ({worker.reviews.length})
                </h3>
            </div>

            {worker.reviews.map((review, index) => (
                <div
                    key={index}
                    className="border-b last:border-none py-4"
                >
                    <p className="font-medium">{review.name}</p>
                    <p className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                    </p>
                    <p className="text-gray-600 text-sm">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default WorkerReviews;