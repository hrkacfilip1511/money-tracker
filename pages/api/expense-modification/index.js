import { connectToDatabase } from "../../../lib/database";
const handler = async (req, res) => {
  if (req.method === "PUT") {
    const {
      email,
      expenseId,
      date,
      category,
      paymentMethod,
      title,
      amount,
      quantity,
      details,
    } = req.body;
    const client = await connectToDatabase();
    if (!title || title.length === 0) {
      res.status(403).json({ message: "Title can't be empty!" });
      client.close();
      return;
    }
    if (!category || category.length === 0) {
      res.status(403).json({ message: "Category can't be empty!" });
      client.close();
      return;
    }

    if (
      !date ||
      new Date(date).getMonth() !== new Date().getMonth() ||
      new Date(date).getFullYear() !== new Date().getFullYear()
    ) {
      res.status(403).json({
        message: "Date must be equal with current month and current year!",
      });
      client.close();
      return;
    }
    if (new Date(date).getDate() > new Date().getDate()) {
      res.status(403).json({
        message: "You can't add expense in the future!",
      });
      client.close();
      return;
    }
    if (!amount || parseFloat(amount) === 0) {
      res
        .status(403)
        .json({ message: "Amount can't be empty or less than 1!" });
      client.close();
      return;
    }
    if (!quantity || parseInt(quantity) === 0) {
      res
        .status(403)
        .json({ message: "Quantity can't be empty or less than 1!" });
      client.close();
      return;
    }
    if (!paymentMethod || paymentMethod.length === 0) {
      res
        .status(403)
        .json({ message: "Please select one of the payment methods!" });
      client.close();
      return;
    }
    const user = await client
      .db()
      .collection("expenses")
      .findOne({ user: email });
    if (!user) {
      res.status(403).json({ message: "User not found!" });
      client.close();
      return;
    }

    //   const result = await
    let filteredTempArr = user?.expenses.filter(
      (expense) => expense.expenseId !== expenseId
    );
    filteredTempArr = [
      ...filteredTempArr,
      {
        expenseId,
        date,
        category,
        paymentMethod,
        title,
        amount,
        quantity,
        details,
      },
    ];
    const result = await client
      .db()
      .collection("expenses")
      .updateOne(
        { user: email },
        {
          $set: {
            expenses: filteredTempArr,
          },
        }
      );
    res.status(201).json({ message: "Expense updated." });
    client.close();
  }
};

export default handler;
