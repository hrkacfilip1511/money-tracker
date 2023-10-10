import { connectToDatabase } from "../../../lib/database";

const handler = async (req, res) => {
  const client = await connectToDatabase();
  const categories = await client
    .db()
    .collection("categories")
    .find({})
    .toArray();
  if (categories.length > 0) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "No categories avaliable" });
  }
  client.close();
  return categories;
};

export default handler;
