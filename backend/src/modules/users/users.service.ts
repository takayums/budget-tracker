import bcrypt from "bcrypt";
import BadRequestError from "@/errors/BadRequestError";
import ServerError from "@/errors/ServerError";
import NotFoundError from "@/errors/NotFoundError";
import User, { UserAttributes } from "@/modules/users/users.model";

/**
 * @class UserService
 * @description Meyediakan logka untuk oprasi user
 **/

class UserService {
  /**
   * Mengembalikan semua user kecuali password
   * @returns {Promise<Omit<UserAttributes, "password">[]>}
   **/

  public async getAll(): Promise<Omit<UserAttributes, "password">[]> {
    return await User.findAll({ attributes: { exclude: ["password"] } });
  }

  /**
   * Mengembalikan user bedasarkan id kecuali password
   * @params {number} id - ID User
   * @returns {Promise<Omit<UserAttributes, "password">[]>}
   **/

  public async getById(
    id: number,
  ): Promise<Omit<UserAttributes, "password"> | null> {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    console.log(process.env.NODE_ENV === "development");

    if (!user) {
      throw new NotFoundError("User tidak ditemukan");
    }

    return user;
  }

  /**
   * Create User
   * @params {data: UserAttributes}
   * @return {Promise<Omit<UserAttributes, "password">[]>}
   */

  public async create(
    data: UserAttributes,
  ): Promise<Omit<UserAttributes, "password">> {
    const existstingUser = await User.findOne({
      where: { email: data.email },
    });
    if (existstingUser) {
      throw new BadRequestError("Email is already");
    }

    const hash = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hash });
    const userJson = user.toJSON() as Omit<UserAttributes, "password">;

    delete (userJson as Partial<UserAttributes>).password;
    return userJson;
  }
  /**
   * Updatek User
   * @params {id} ID User
   * @params {Partial<UserAttributes>} data
   * @return {Promise<Omit<UserAttributes, 'password'> | null>}
   */

  public async update(
    id: number,
    data: Partial<UserAttributes>,
  ): Promise<Omit<UserAttributes, "password"> | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    if (data.email && data.email !== user.email) {
      const existstingUser = await User.findOne({
        where: { email: data.email },
      });
      if (existstingUser) {
        throw new BadRequestError("Email is already");
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    try {
      await user.update(data, { validate: true });
    } catch (err: any) {
      console.error("error", err);
      const message = err.errors?.map((e: any) => e.message) || [err.message];
      throw new ServerError("Gagal update user:" + message.join(", "));
    }

    const userJson = user.toJSON();
    delete (userJson as Partial<UserAttributes>).password;
    return userJson;
  }

  /**
   * Delete User
   * @params {id} ID User
   * @return {Promise<boolean>}
   */

  public async delete(id: number): Promise<boolean> {
    try {
      console.log(">> [Service] delete() dipanggil dengan ID:", id);

      const user = await User.findByPk(id);
      console.log(">> [Service] Hasil findByPk:", user);

      if (!user) {
        console.log(">> [Service] User tidak ditemukan, lempar NotFoundError");
        throw new NotFoundError("Data User tidak ditemukan");
      }

      await user.destroy();
      console.log(">> [Service] User berhasil dihapus");
      return true;
    } catch (error) {
      console.error(">> [Service] Terjadi error di delete():", error);
      throw error; // biar controller bisa tangani
    }
  }
}

export default new UserService();
