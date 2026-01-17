import WorkerCard from "../components/cards/WorkerCard";
import { workers } from "../data/worker";

const FindLabour = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Find Labour</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workers.map(worker => (
                    <WorkerCard
                        key={worker.id}
                        name={worker.name}
                        rating={worker.rating}
                        status={worker.status}
                        skills={worker.skills}
                    />
                ))}
            </div>
        </div>
    );
};

export default FindLabour;