import * as bcrypt from "bcryptjs";

export async function hashPassword(password: string, saltRounds?: number) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return { hash, salt };
}

export function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
