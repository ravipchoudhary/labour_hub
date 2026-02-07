import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLabourById, getLabours } from "../api/labourApi";
import type { Worker } from "../data/worker";

import WorkerHeader from "../components/worker/WorkerHeader";
import WorkerAbout from "../components/worker/WorkerAbout";
import WorkerReviews from "../components/worker/WorkerReviews";
import SimilarWorkers from "../components/worker/SimilarWorkers";
import SafetyTips from "../components/worker/SafetyTips";
import WorkerContactCard from "../components/worker/WorkerContactCard";

const WorkerDetail = () => {
    const { id } = useParams<{ id: string }>();

    const [worker, setWorker] = useState<Worker | null>(null);
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const workerData = await getLabourById(id);
                const allWorkers = await getLabours();

                setWorker(workerData);
                setWorkers(allWorkers);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p className="p-8">Loading...</p>;
    if (!worker) return <p className="p-8">Worker not found</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WorkerHeader worker={worker} />
                    <WorkerAbout worker={worker} />
                    <WorkerReviews worker={worker} />
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