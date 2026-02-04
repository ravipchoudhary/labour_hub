import express from "express";
import { connection as connectDB} from "./config/db.js"
import adminRouter from "./routes/adminRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin",adminRouter);

await connectDB();



app.listen(4000,()=> {
    console.log("server is running on port ")
});