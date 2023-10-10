import { connectToDatabase } from "../../../lib/database";

const handler = async (req, res) => {
  const userEmail = req.query.email;
  const date = req.query.date;
  const formattedDate = new Date(date);
  const client = await connectToDatabase();
  const findedUser = await client
    .db()
    .collection("expenses")
    .findOne({ user: userEmail });

  if (!findedUser) {
    res.status(403).json({ message: "No user found" });
    client.close();
  }

  const filteredExpenses = findedUser.expenses.filter(
    (expense) =>
      new Date(expense.date).getMonth() === formattedDate.getMonth() &&
      new Date(expense.date).getFullYear() === formattedDate.getFullYear()
  );
  if (filteredExpenses) {
    res.status(201).json({ expenses: filteredExpenses });
    client.close();
    return filteredExpenses;
  }
  res.status(403).json({ message: "Something went wrong" });
  client.close();
  return;
};

export default handler;
