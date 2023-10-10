import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/database";
import { verifyPassword } from "../../../lib/password-functions";
export const authOptions = {
  secret: "firstfullstackapp",
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User is not existing.");
        }
        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Password is not correct. Plese try again.");
        }
        client.close();
        console.log(user);
        return {
          email: user.email,
          name: user.name,
          image: user.budget,
        };
      },
    }),
  ],
};
export default NextAuth(authOptions);
