import bcrypt from "bcrypt";

import User from "@/modules/users/users.model";
import JwtService from "@/modules/auth/jwt.secret";
import BadRequestError from "@/errors/BadRequestError";
import NotFoundError from "@/errors/NotFoundError";

class AuthService {
  async register({
    email,
    password,
    name,
    number,
  }: {
    email: string;
    password: string;
    name: string;
    number: string;
  }) {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      throw new BadRequestError("Email user sudah terdaftar");
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash, number });
    const token = JwtService.sign({ id: newUser.id, email: newUser.email });

    const userJson = newUser.toJSON() as any;
    delete userJson.password;
    return { user: userJson, token };
  }
  async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError("User tidak ditemukan");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new BadRequestError("Email dan Password salah");
    }

    const token = JwtService.sign({ id: user.id, email: user.email });
    const userJson = user.toJSON() as any;
    delete userJson.password;
    return { user: userJson, token };
  }
  async profile(userId: number) {
    const user = await User.findByPk(userId);
    const userJson = user?.toJSON() as any;
    delete userJson.password;
    return userJson;
  }
}

export default new AuthService();
