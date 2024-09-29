/* eslint-disable prettier/prettier */
// utils/jwt.util.ts

import * as jwt from 'jsonwebtoken';

export function generateJwtToken(userId: number, userEmail: string): string {
  const payload = { userId, userEmail };
  return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key
}
