import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
let db: Db;

export const connectDB = async (): Promise<Db> => {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGODB_DB_NAME || 'greetingapp');
  console.log('Connected to MongoDB');
  return db;
};
