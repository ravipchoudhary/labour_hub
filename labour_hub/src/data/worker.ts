export type WorkerStatus = "Available" | "Busy";

export interface Worker {
    id: number;
    name: string;
    skills: string[];
    location: string;
    rating: number;
    price: number;
    about: string;
    experience: number;
    languages: string[];
    workingHours: string;
    responseTime: string;
    available: boolean;
    reviews: {
        name: string;
        comment: string;
        rating: number;
    } [];
};
export const workers: Worker[] = [
    {
        reviews: [
            {
                name: "Amit Sharma",
                comment: "Very professional and punctual.",
                rating: 5
            },
            {
                name: "Priya Singh",
                comment: "Good work and clean finishing.",
                rating: 4
            }
        ],      
        id: 1,
        name: "Rajesh Kumar",
        location: "Noida, UP",
        skills: ["Electrician", "Wiring", "AC Repair"],
        rating: 4.8,
        price: 600,
        available: true,
        experience: 6,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 6:00 PM",
        responseTime: "< 2 hour",
        about:
            "Experienced electrician with expertise in residential and commercial work."
    },
    {
        reviews: [
            {
                name: "Amit Sharma",
                comment: "Very professional and punctual.",
                rating: 5
            },
            {
                name: "Priya Singh",
                comment: "Good work and clean finishing.",
                rating: 4
            }
        ],
        id: 2,
        name: "Anil Mehta",
        location:"jaipur, Rajasthan",
        skills: ["Wiring", "AC Repair"],
        rating: 4.5,
        price: 550,
        available: false,
        experience: 4,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 6:00 PM",
        responseTime: "< 1 hour",
        about:
            "Experienced electrician with expertise in residential and commercial work."
    },
    {
        reviews: [
            {
                name: "Amit Sharma",
                comment: "Very professional and punctual.",
                rating: 5
            },
            {
                name: "Priya Singh",
                comment: "Good work and clean finishing.",
                rating: 4
            }
        ],
        id: 3,
        name: "Amit Sigh",
        location: "Lucknow, UP",
        skills: ["Electrician", "Wiring"],
        rating: 4.0,
        price: 500,
        available: true,
        experience: 5,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 6:00 PM",
        responseTime: "< 3 hour",
        about:
            "Experienced electrician with expertise in residential and commercial work."
    },
    {
        reviews: [
            {
                name: "Amit Sharma",
                comment: "Very professional and punctual.",
                rating: 5
            },
            {
                name: "Priya Singh",
                comment: "Good work and clean finishing.",
                rating: 4
            }
        ],
        id: 4,
        name: "Vikram Singh",
        location: "Lucknow, UP",
        skills: ["Electrician", "Wiring"],
        rating: 4.0,
        price: 500,
        available: true,
        experience: 5,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 6:00 PM",
        responseTime: "< 1 hour",
        about:
            "Experienced electrician with expertise in residential and commercial work."
    },
    {
        reviews: [
            {
                name: "",
                comment: "Very professional and punctual.",
                rating: 5
            },
            {
                name: "Priya Singh",
                comment: "Good work and clean finishing.",
                rating: 4
            }
        ],
        id: 5,
        name: "Ramesh Singh",
        location: "Lucknow, UP",
        skills: ["Electrician", "Wiring"],
        rating: 3.9,
        price: 330,
        available: true,
        experience: 2,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 5:00 PM",
        responseTime: "< 1 hour",
        about:
            "Experienced electrician with expertise in residential and commercial work."
    },
    {
        reviews: [
            {
                name: "Amit Sharma",
                comment: "Very professional and punctual.",
                rating: 5
            },
            {
                name: "Priya Singh",
                comment: "Good work and clean finishing.",
                rating: 4
            }
        ],
        id: 6,
        name: "Rahul Verma",
        location: "kanpur, UP",
        skills: ["Carpenter", "Wiring"],
        rating: 4.1,
        price: 400,
        available: false,
        experience: 3,
        languages: ["Hindi", "English"],
        workingHours: "10:00 AM - 7:00 PM",
        responseTime: "< 1 hour",
        about:
            "Experienced electrician with expertise in residential and commercial work."
    },
    
];