import { connectToDatabase } from "../../../lib/database";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const expenseId = req.body.expenseId;

    const client = await connectToDatabase();

    const findedUser = await client
      .db()
      .collection("expenses")
      .findOne({ user: email });

    if (!findedUser) {
      res.status(403).json({ message: "User not found!" });
      client.close();
    }
    const findedExpense = findedUser?.expenses?.find(
      (expense) => expense.expenseId === +expenseId
    );
    if (!findedExpense) {
      res.status(403).json({ message: "Expense not found!" });
      client.close();
    }
    res.status(201).json({ expense: findedExpense });
    client.close();
  }
};

export default handler;
