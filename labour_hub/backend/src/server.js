import express from "express";
import { connection as connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import labourRoutes from "./routes/labourRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/labour", labourRoutes);

await connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT} `)
    
});