import { MongoClient } from "mongodb";

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

export async function POST(req) {
  try {
    const videoData = await req.json();
    const { client, db } = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne(videoData);

    return new Response(
      JSON.stringify({
        message: "Video uploaded successfully",
        insertedId: result.insertedId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error inserting video data:", error);
    return new Response(JSON.stringify({ message: "Failed to upload video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
