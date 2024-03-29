import { connectToDatabase } from "../../../lib/database";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const budget = req.body.budget;
    const email = req.body.email;
    const client = await connectToDatabase();
    if (!budget || budget.length === 0) {
      res.status(403).json({ message: "Input field can't be empty!" });
      client.close();
    }
    const parsedBudget = parseFloat(budget);
    if (isNaN(parsedBudget)) {
      res.status(403).json({ message: "Please enter valid value." });
      client.close();
    }

    if (parsedBudget <= 0) {
      res.status(403).json({ message: "Budget must be greater than 0!" });
      client.close();
    }

    const newBudgetData = await client
      .db()
      .collection("users")
      .updateOne({ email: email }, { $set: { budget: parsedBudget } });
    if (newBudgetData.modifiedCount !== 0) {
      res
        .status(200)
        .json({ message: "Budget updated successfully.", user: newBudgetData });
      client.close();
    } else {
      res.status(403).json({ message: "User not found.", user: newBudgetData });
      client.close();
    }
  }
};

export default handler;
