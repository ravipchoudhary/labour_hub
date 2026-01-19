export type WorkerStatus = "Available" | "Busy";

export interface Worker {
    id: number;
    name: string;
    skills: string[];
    location: string;
    rating: number;
    price: number;
    available: boolean;
};

export const workers: Worker[] = [
    {
        id: 1,
        name: "Ramesh Kumar",
        rating: 4.5,
        available: true,
        price: 555,
        location: "mumbai",
        skills: ["Plumber" , " ","Electrician"],
    },
    {
        id: 2,
        name: "Vivak Yadav",
        rating: 4.6,
        price: 550,
        available: false,
        location: "Uttar Pradesh",
        skills: ["Plumber"],
    },
    {
        id: 3, 
        price: 690,
        name: "Vikram Yadav",
        rating: 4.5,
        available: true,
        location: "Noida",
        skills: ["Electrician"],
    },
    {
        id: 4,
        price: 560,
        name: "Suraj Gupta",
        rating: 4.2,
        available: false,
        location: "Maharashtra",
        skills: ["Carpenter"],
    },
    {
        id: 5,
        name: "Akash Singh",
        rating: 4.0,
        price: 470,
        available: true,
        location: "Dilhi",
        skills: ["Carpenter"],
    },
    {
        id: 6,
        name: "Suresh Yadav",
        rating: 4.4,
        price: 555,
        available: false,
        location: "Gurgaon",
        skills: ["Carpenter"," ","Plumber"],
    },
];