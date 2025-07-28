import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserRequest extends Request {
  userId?: number | null;
  user: string | JwtPayload;
}
