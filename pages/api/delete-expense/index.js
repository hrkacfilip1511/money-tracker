import { connectToDatabase } from "../../../lib/database";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const expenseId = req.query.expenseId;
    const email = req.query.email;
    const client = await connectToDatabase();
    const findedUser = await client
      .db()
      .collection("expenses")
      .findOne({ user: email });
    if (!findedUser) {
      res.statu(403).json({ message: "User not found!" });
      client.close();
      return;
    }
    let tempExpenseArray = findedUser.expenses.filter(
      (expense) => expense.expenseId !== +expenseId
    );

    const result = await client
      .db()
      .collection("expenses")
      .updateOne({ user: email }, { $set: { expenses: tempExpenseArray } });
    res.status(201).json({ message: "Expense deleted." });
    client.close();
  }
};

export default handler;
