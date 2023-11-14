import { connectToDatabase } from "../../../lib/database";

const handler = async (req, res) => {
  const client = await connectToDatabase();
  const user = req.body;
  const data = await client.db().collection("expenses").findOne(user);
  if (data) {
    res.status(200).json({ message: "All good", data: data });
    client.close();
  } else {
    res.status(403).json({ message: "Something went wrong" });
    client.close();
  }
};
export default handler;
