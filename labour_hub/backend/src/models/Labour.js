import mongoose from "mongoose";
import { type } from "node:os";

const labourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone:{type: String, required:true},
    password: { type: String, required: true },
    email: { type: String, required: true },
    skill: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    experience:{ type: Number, default: 0},
    available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Labours", labourSchema);
