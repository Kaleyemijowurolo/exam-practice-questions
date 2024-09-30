// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

const uri = process.env.MONGODB_URI || "";
const options = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectToDatabase() {
  console.log("Connecting to MongoDB..."); // Indicate the start of the connection process
  if (client && db) {
    return { client, db };
  }

  // Create a new MongoClient
  client = new MongoClient(uri, options);

  // Connect the client
  await client.connect();
  db = client.db("exam-practice"); // Change to your DB name
  console.log("MongoDB connected successfully!");

  return { client, db };
}
