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

    const markBusy = async () => {
        if (!worker) return;
        await fetch(`http://localhost:4000/labour/${worker._id}/availability`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ available: false })
        });
        setWorker({ ...worker, available: false });
    };
    const addReviewToWorker = (reviews: any[]) => {
        if (!worker) return;

        const avgRating =
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        setWorker({
            ...worker,
            reviews,
            rating: avgRating,
        });
    };
    
    

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const workerData = await getLabourById(id);
                const calculatedRating =
                    workerData.reviews && workerData.reviews.length > 0
                        ? workerData.reviews.reduce(
                            (sum: number, r: any) => sum + r.rating,
                            0
                        ) / workerData.reviews.length
                        : 0;
                const formattedWorker: Worker = {
                    _id: workerData._id,
                    name: workerData.name,
                    phone: workerData.phone || "N/A",
                    location: workerData.location,
                    price: workerData.price,
                    skills: workerData.skills?.length
                        ? workerData.skills
                        : workerData.skill
                            ? [workerData.skill]
                            : [],
                    rating: calculatedRating,
                    experience: workerData.experience ?? 0,
                    available: workerData.available ?? true,
                    reviews: workerData.reviews || [],
                    languages: [],
                    workingHours: "9 AM - 6 PM",
                    responseTime: "1 hour",
                    about: "No description available",
                };

                const allWorkersRaw = await getLabours();

                const formattedWorkers: Worker[] = allWorkersRaw.map((w: any) => ({
                    _id: w._id,
                    name: w.name,
                    location: w.location,
                    price: w.price,
                    skills: w.skills?.length ? w.skills : [],
                    rating: w.rating ?? 0,
                    experience: w.experience ?? 0,
                    available: w.available ?? true,
                    reviews: w.reviews || [],
                    languages: [],
                    phone: w.phone || "N/A",
                    workingHours: "9 AM - 6 PM",
                    responseTime: "1 hour",
                    about: "No description available",
                }));

                setWorker(formattedWorker);
                setWorkers(formattedWorkers);
            } catch (err) {
                console.error("Worker detail error:", err);
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
                    <WorkerReviews worker={worker} onReviewAdded={addReviewToWorker} />
                </div>

                <div>
                    <WorkerContactCard worker={worker} onMarkBusy={markBusy} />
                    <SimilarWorkers currentWorker={worker} workers={workers} />
                    <SafetyTips />
                </div>
            </div>
        </div>
    );
};

export default WorkerDetail;