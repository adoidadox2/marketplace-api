import bcrypt from "bcrypt";

export default async function encryptPassword(
  password: string
): Promise<string> {
  const password_hash = await bcrypt.hash(password, 8);

  return password_hash;
}
