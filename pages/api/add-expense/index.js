import { connectToDatabase } from "../../../lib/database";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      email,
      title,
      category,
      date,
      amount,
      quantity,
      paymentMethod,
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
    const findedUser = await client.db().collection("expenses").findOne({
      user: email,
    });
    if (!findedUser) {
      const expenseResult = await client
        .db()
        .collection("expenses")
        .insertOne({
          user: email,
          expenses: [
            {
              expenseId: parseInt(Math.random() * 100000),
              title,
              category,
              date,
              amount,
              quantity,
              paymentMethod,
              details,
            },
          ],
        });
      res.status(201).json({ message: "You have added expense successfully." });
      client.close();
      return expenseResult;
    } else {
      const expenseId = parseInt(Math.random() * 100000);
      const expenseUpdate = {
        $push: {
          expenses: {
            expenseId,
            title,
            category,
            date,
            amount,
            quantity,
            paymentMethod,
            details,
          },
        },
      };

      const expenseResult = await client
        .db()
        .collection("expenses")
        .updateOne({ user: email }, expenseUpdate);
      res.status(201).json({ message: "You have added expense successfully." });
      client.close();
      return expenseResult;
    }
  }
};

export default handler;
