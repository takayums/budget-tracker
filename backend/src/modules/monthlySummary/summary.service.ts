import MonthlySummary from "./summary.model";
import NotFoundError from "@/errors/NotFoundError";

class MonthlySummaryService {
  async getAll() {
    return await MonthlySummary.findAll();
  }
  async getById(id: number) {
    const summary = await MonthlySummary.findByPk(id);
    if (!summary) throw new NotFoundError("Summary tidak ditemukan");
    return summary;
  }
  async create(data: any) {
    return await MonthlySummary.create(data);
  }
  async update(id: number, data: any) {
    const summary = await MonthlySummary.findByPk(id);
    if (!summary) throw new NotFoundError("Summary tidak ditemukan");
    await summary.update(data);
    return summary;
  }
  async delete(id: number) {
    const summary = await MonthlySummary.findByPk(id);
    if (!summary) throw new NotFoundError("Summary tidak ditemukan");
    await summary.destroy();
    return summary;
  }
  async generate(userId: number) {}
}

export default new MonthlySummaryService();
