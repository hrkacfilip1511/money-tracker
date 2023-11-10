import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.rxsdh.mongodb.net/${process.env.mongodb_database}`;
  console.log(connectionString);
  const client = await MongoClient.connect(connectionString);
  return client;
};
