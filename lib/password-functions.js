import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPassword = hash(password, 8);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
