import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const MONGODB_URI =
  "mongodb+srv://Web_Yatra_Admin:Webyatra-0312@webyatra.gpkb7.mongodb.net/?retryWrites=true&w=majority&appName=WebYatra";
const MONGODB_DB = "WebYatra";
const COLLECTION_NAME = "Course_Info";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function POST(request) {
  const body = await request.json();

  const { title, description, category, videoPath } = req.body;

  try {
    const { db } = await connectToDatabase();
    await db.collection(COLLECTION_NAME).insertOne({
      title,
      description,
      category,
      videoPath,
    });
    return res.status(201).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return NextResponse.json({ message: "Video uploaded successfully" });
}
