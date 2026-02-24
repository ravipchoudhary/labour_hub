import WorkerCard from "../components/cards/WorkerCard";
import { useEffect, useRef, useState } from "react";
import { getLabours } from "../api/labourApi";
import type { Worker } from "../data/worker";
import { useSearchParams } from "react-router-dom";

declare global {
    interface Window {
        google: any;
    }
}

const FindLabour = () => {
    const [searchParams] = useSearchParams();

    const [labours, setLabours] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [location, setLocation] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    const key = import.meta.env.VITE_GOOGLE_API_KEY;

    // 🔥 GOOGLE AUTOCOMPLETE
    useEffect(() => {
        if (!key) return;

        const existingScript = document.getElementById("google-maps-script");
        if (existingScript) {
            initAutocomplete();
            return;
        }

        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            initAutocomplete();
        };

        document.body.appendChild(script);

        function initAutocomplete() {
            if (!inputRef.current || !window.google) return;

            const autocomplete = new window.google.maps.places.Autocomplete(
                inputRef.current,
                {
                    types: ["geocode"],
                    componentRestrictions: { country: "in" },
                }
            );

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    setLocation(place.formatted_address);
                }
            });
        }
    }, [key]);

    // 🔥 FETCH LABOURS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLabours();

                const transformedData = data.map((labour: any) => {
                    const reviews = labour.reviews || [];

                    const rating =
                        reviews.length > 0
                            ? reviews.reduce(
                                (sum: number, r: any) => sum + r.rating,
                                0
                            ) / reviews.length
                            : 0;

                    return {
                        ...labour,
                        skills: labour.skills || [],
                        available: labour.available ?? true,
                        rating,
                    };
                });

                setLabours(transformedData);
            } catch (error) {
                console.error("Error fetching labours", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 🔥 FILTER LOGIC
    const filteredWorkers = labours.filter((worker) => {
        const skillMatch =
            selectedSkill === "All" || worker.skills.includes(selectedSkill);

        const locationMatch =
            location === "" ||
            worker.location?.toLowerCase().includes(location.toLowerCase());

        return skillMatch && locationMatch;
    });

    if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
                <h1 className="text-3xl font-semibold mb-4">
                    Find Skilled Workers
                </h1>

                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="px-4 py-2 rounded text-black"
                    >
                        <option value="All">All Skills</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Labour">Labour</option>
                    </select>

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="px-4 py-2 rounded text-black flex-1"
                    />
                </div>
            </div>

            {filteredWorkers.length === 0 ? (
                <p>No worker found for selected filters.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkers.map((worker) => (
                        <WorkerCard
                            key={worker._id}
                            _id={worker._id}
                            name={worker.name}
                            skills={worker.skills}
                            location={worker.location}
                            price={worker.price}
                            rating={worker.rating ?? 0}
                            available={worker.available ?? false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindLabour;