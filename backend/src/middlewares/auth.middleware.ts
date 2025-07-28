import { NextFunction, RequestHandler, Response } from "express";
import { UserRequest } from "@/type/user.request";
import JwtService from "@/modules/auth/jwt.secret";
import UnauthorizedError from "@/errors/UnauthorizedError";
import { JwtPayload } from "jsonwebtoken";

const authJwt = (req: UserRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token tidak ditemukan");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decode = JwtService.verify(token) as JwtPayload & {
      id: number;
      email: string;
    };
    req.user = decode;
    req.userId = decode.id!;
    next();
  } catch (error) {
    throw new UnauthorizedError("Token ini sudah tidak valid atau kadaluarsa");
  }
};

export default authJwt;
