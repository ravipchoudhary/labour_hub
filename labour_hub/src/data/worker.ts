export type WorkerStatus = "Available" | "Busy";

export interface Worker {
    id: number;
    name: string;
    rating: number;
    status: WorkerStatus;
    skills: string[];
}

export const workers: Worker[] = [
    {
        id: 1,
        name: "Ramesh Kumar",
        rating: 4.5,
        status: "Available",
        skills: ["Plumber ," , " Electrician"],
    },
    {
        id: 2,
        name: "Suresh Yadav",
        rating: 4.2,
        status: "Busy",
        skills: ["Carpenter"],
    },
    {
        id: 3,
        name: "Vikram Yadav",
        rating: 4.5,
        status: "Available",
        skills: ["Electrician"],
    },
    {
        id: 4,
        name: "Suresh Yadav",
        rating: 4.2,
        status: "Busy",
        skills: ["Carpenter"],
    },
    {
        id: 5,
        name: "Suresh Yadav",
        rating: 4.2,
        status: "Available",
        skills: ["Carpenter"],
    },
    {
        id: 6,
        name: "Suresh Yadav",
        rating: 4.2,
        status: "Busy",
        skills: ["Carpenter ,"," Plumber"],
    },
];