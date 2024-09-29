/* eslint-disable prettier/prettier */
// utils/password.util.ts

import * as bcrypt from 'bcrypt';

export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  console.log(password)
  console.log(bcrypt.compare(password, hashedPassword))
  return await bcrypt.compare(password, hashedPassword);
}
