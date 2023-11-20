import { connectToDatabase } from "../../../lib/database";
import { hashPassword } from "../../../lib/password-functions";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const budget = req.body.budget;
    const confirmPassword = req.body.confirmPassword;
    const parsedBudget = parseFloat(budget);
    const client = await connectToDatabase();

    const existingUser = await client
      .db()
      .collection("users")
      .findOne({ email: email });

    if (
      !name ||
      name.length === 0 ||
      !email ||
      !email.includes("@") ||
      email.length === 0 ||
      !password ||
      !confirmPassword ||
      isNaN(parsedBudget)
    ) {
      res
        .status(403)
        .json({ message: "All fields are required and needs to be valid" });
      client.close();
      return;
    }

    if (password.length < 6) {
      res.status(403).json({ message: "Minimial 6 characters for password" });
      client.close();
      return;
    }

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      client.close();
      return;
    }

    if (password !== confirmPassword) {
      res.status(403).json({ message: "Passwords do not match." });
      client.close();
      return;
    }

    if (parsedBudget <= 0) {
      res.status(409).json({ message: "Budget must be greater than 0!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const result = await client.db().collection("users").insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      budget: parsedBudget,
    });
    res.status(200).json({ message: "User created!" });
    client.close();
  }
};

export default handler;
