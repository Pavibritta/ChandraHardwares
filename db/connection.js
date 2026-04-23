import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);

const connectionString = process.env.MONGODB_URI;

// const client = new MongoClient(connectionString);

// let db;

try {
  const conn = await mongoose.connect(connectionString,{dbName:"Hardwares"});
  console.log("✅ DB Connected");
  // db = conn.db("Hardwares");
} catch (error) {
  console.error("❌ Failed to connect");
  console.error(error);
}

// export default db;
