import Category from "@/modules/category/category.model";
import NotFoundError from "@/errors/NotFoundError";

class CategoryService {
  async getAll() {
    const category = await Category.findAll();
    if (category.length == 0) {
      throw new NotFoundError("Category Kosong");
    }
    return category;
  }
  async getById(id: number) {
    const categoryById = await Category.findByPk(id);
    if (!categoryById) throw new NotFoundError("Category tidak ditemukan");
    return categoryById;
  }
  async create(data: { name: string; description: string }) {
    const category = await Category.create(data);
    return category;
  }
  async update(id: number, data: { name: string; description: string }) {
    const categoryById = await Category.findByPk(id);
    if (!categoryById) throw new NotFoundError("Category tidak ditemukan");
    const category = await Category.update(data, { where: { id } });
    return category;
  }
  async delete(id: number) {
    const category = await Category.destroy({ where: { id } });
    if (!category) throw new NotFoundError("Category tidak ada");
    return category;
  }
}

export default new CategoryService();
