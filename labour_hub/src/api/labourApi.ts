const BASE_URL = "http://localhost:4000/api";

export const getLabours = async () => {
    const res = await fetch(`${BASE_URL}/labour`);
    if (!res.ok) {
        throw new Error("Failed to fetch labours");
    }
    return res.json();
};

export const getLabourById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/labour/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch labour");
    }
    return res.json();
};
