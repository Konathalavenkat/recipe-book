import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => bcrypt.compare(password, hash);
