import jwt from "jsonwebtoken";
import config from "@/config/config";

class JwtService {
  sign(payload: { id: number; email: string }) {
    return jwt.sign(payload, config.jwt.secret as string, { expiresIn: "1h" });
  }

  verify(token: string) {
    return jwt.verify(token, config.jwt.secret as string);
  }
}

export default new JwtService();
