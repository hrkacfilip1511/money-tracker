import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://filip:y5BSUo96fRBGUp4V@cluster0.rxsdh.mongodb.net/monthlyExpenses"
  );
  return client;
};
