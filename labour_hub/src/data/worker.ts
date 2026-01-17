export type WorkerStatus = "Available" | "Busy";

export interface Worker {
    id: number;
    name: string;
    skills: string[];
    location: string;
    rating: number;
    available: boolean;
};

export const workers: Worker[] = [
    {
        id: 1,
        name: "Ramesh Kumar",
        rating: 4.5,
        available: true,
        location: "Noida",
        skills: ["Plumber ,", " Electrician"],
    },
    {
        id: 2,
        name: "Suresh Yadav",
        rating: 4.2,
        available: false,
        location: "Noida",
        skills: ["Carpenter"],
    },
    {
        id: 3,
        name: "Vikram Yadav",
        rating: 4.5,
        available: true,
        location: "Noida",
        skills: ["Electrician"],
    },
    {
        id: 4,
        name: "Suresh Yadav",
        rating: 4.2,
        available: true,
        location: "Noida",
        skills: ["Carpenter"],
    },
    {
        id: 5,
        name: "Suresh Yadav",
        rating: 4.2,
        available: true,
        location: "Noida",
        skills: ["Carpenter"],
    },
    {
        id: 6,
        name: "Suresh Yadav",
        rating: 4.2,
        available: true,
        location: "Noida",
        skills: ["Carpenter ,", " Plumber"],
    },
];