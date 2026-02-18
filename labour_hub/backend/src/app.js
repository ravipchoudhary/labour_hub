import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import labourRoutes from "./routes/labourRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/auth",authRoutes);
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend connected successfully 🚀" });
});

app.use("/api/labour", labourRoutes);

export default app;