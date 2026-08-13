import jwt from "jsonwebtoken";
import { env } from "./env.js";

const JWT_SECRET = process.env.JWT_SECRET || "b8E5$@kP2#fH7zV0qWm9L^xYt3G&nJ44";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

export function signJwtToken(payload: JwtPayload, expiresIn = "7d"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
