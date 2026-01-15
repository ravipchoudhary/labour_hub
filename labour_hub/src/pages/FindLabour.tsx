import WorkerCard from "../components/cards/WorkerCard";

const FindLabour = () => {
    return (
        <div className="bg-gray-100 p-8 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">6 workers found</h2>

            <div className="grid grid-cols-2 gap-6">
                <WorkerCard name="Rajesh Kumar" rating={4.6} status="Available" />
                <WorkerCard name="Suresh Singh" rating={4.5} status="Available" />
                <WorkerCard name="Amit Sharma" rating={4.4} status="Available" />
                <WorkerCard name="Manoj Patel" rating={4.1} status="Busy" />
            </div>
        </div>
    );
};

export default FindLabour;