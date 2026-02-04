import { MongoClient } from "mongodb"
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
let dbName = "labour_hub";
export const collectionName="adminlogin";

export const connection = async ()=> {
    const connect = await client.connect();
    return await connect.db(dbName)
}
