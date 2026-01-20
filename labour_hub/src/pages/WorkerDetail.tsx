import { useParams } from "react-router-dom";
import { workers } from "../data/worker";

import WorkerHeader from "../components/worker/WorkerHeader";
import WorkerAbout from "../components/worker/WorkerAbout";
import WorkerReviews from "../components/worker/WorkerReviews";
import SimilarWorkers from "../components/worker/SimilarWorkers";
import SafetyTips from "../components/worker/SafetyTips";
import WorkerContactCard from "../components/worker/WorkerContactCard";

const WorkerDetail = () => {
    const { id } = useParams();
    const worker = workers.find((w) => w.id === Number(id));


    if (!worker) return <p>Worker not found</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
            
                    <WorkerHeader worker={worker} />
                    <WorkerAbout worker={worker}/>
                    <WorkerReviews worker={worker}/>
                </div>

                <div>
                    <WorkerContactCard worker={worker} />
                    <SimilarWorkers currentWorker={worker} workers={workers} />
                    <SafetyTips />
                </div>
            </div>
        </div>
    );
};

export default WorkerDetail;