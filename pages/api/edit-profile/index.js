import { connectToDatabase } from "../../../lib/database";
import { hashPassword, verifyPassword } from "../../../lib/password-functions";

const handler = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword, email } = req.body;
  const client = await connectToDatabase();

  const user = await client.db().collection("users").findOne({ email: email });
  if (!user) {
    res.status(403).json({ message: "User not found" });
    client.close();
    return;
  }

  if (
    !oldPassword ||
    !oldPassword.length === 0 ||
    !newPassword ||
    !confirmPassword
  ) {
    res.status(403).json({ message: "Input fields are required." });
    client.close();
    return;
  }

  const isOldPasswordCorrect = await verifyPassword(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    res.status(403).json({ message: "Old password is not correct" });
    client.close();
    return;
  }

  if (newPassword.length < 6 || confirmPassword < 6) {
    res.status(403).json({ message: "Minimial 6 characters for password" });
    client.close();
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(403).json({ message: "Passwords do not match." });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPassword);
  await client
    .db()
    .collection("users")
    .updateOne({ email: email }, { $set: { password: hashedPassword } });
  res.status(200).json({ message: "Password updated." });
};
export default handler;
