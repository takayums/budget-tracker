import { Op } from "sequelize";
import Transaction from "@/modules/transaction/transaction.model";
import Category from "@/modules/category/category.model";
import User from "@/modules/users/users.model";
import NotFoundError from "@/errors/NotFoundError";
import BadRequestError from "@/errors/BadRequestError";

class TransactionService {
  async getAll(
    userId: number,
    page: number = 1,
    limit: number = 10,
    search: string = "",
  ) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Transaction.findAndCountAll({
      where: {
        user_id: userId,
        ...(search && {
          [Op.or]: [
            { note: { [Op.like]: `%${search}%` } },
            { desc: { [Op.like]: `%${search}%` } },
          ],
        }),
      },
      include: [
        {
          model: Category,
          attributes: ["name", "description"],
          as: "category",
          required: false,
        },
        {
          model: User,
          attributes: ["id", "name", "email", "number"],
          as: "user",
          required: false,
        },
      ],
      order: [["date", "DESC"]],
      limit,
      offset,
      distinct: true,
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPage: Math.ceil(count / limit),
      },
    };
  }
  async getById(id: number) {
    const transaction = await Transaction.findOne({
      where: { id },
      include: [
        {
          model: Category,
          attributes: ["name", "description"],
          as: "category",
          required: false,
        },
        {
          model: User,
          attributes: ["id", "name", "email", "number"],
          as: "user",
          required: false,
        },
      ],
    });
    if (!transaction) throw new NotFoundError("Data transaksi tidak ditemukan");
    return transaction;
  }
  async create(data: any) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const transaction = await Transaction.findAll({
      where: {
        user_id: data.user_id,
        date: { [Op.between]: [startOfMonth, endOfMonth] },
      },
    });
    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transaction) {
      const amount = parseInt(tx.amount);

      if (tx.type === "expense") totalExpense += amount;
      if (tx.type === "income") totalIncome += amount;
    }

    const amountAddExpense = parseInt(data.amount);

    if (
      data.type === "expense" &&
      totalIncome < totalExpense + amountAddExpense
    ) {
      console.log(totalIncome, totalExpense);
      throw new BadRequestError("Income bulan ini tidak mencukupi");
    }

    return await Transaction.create(data);
  }
  async update(id: number, data: any) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new NotFoundError("Transaksi Tidak ditemukan");
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await Transaction.findAll({
      where: {
        user_id: transaction.user_id,
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      const amount = parseInt(tx.amount);

      if (tx.type === "income") totalIncome += amount;
      if (tx.type === "expense") totalExpense += amount;
    }

    const amountToAdd = parseInt(data.amount);

    if (data.type === "expense" && totalIncome < totalExpense + amountToAdd) {
      throw new BadRequestError("Income Bulan ini tidak mencukupi");
    }
    return await transaction.update(data);
  }

  async delete(id: number) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new NotFoundError("Transaksi Tidak ditemukan");
    await transaction.destroy();
    return true;
  }

  async getMonthlySummary(userId: number) {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endData = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await Transaction.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [startDate, endData],
        },
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      const amount = parseInt(tx.amount);

      if (tx.type === "income") totalIncome += amount;
      if (tx.type === "expense") totalExpense += amount;
    }

    const balance = totalIncome - totalExpense;
    const saving = Math.floor(
      Math.max(0, totalIncome - totalExpense) * 0.3 + totalIncome * 0.05,
    );

    return { income: totalIncome, expense: totalExpense, balance, saving };
  }

  async getMonthlyChart(userId: number) {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endData = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const transactions = await Transaction.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [startDate, endData],
        },
      },
    });

    const daysInMonth = endData.getDate();
    const charts = [];

    for (let day = 1; day <= daysInMonth; day++) {
      charts.push({
        data: `${now.getFullYear()} - ${String(now.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        income: 0,
        expense: 0,
      });
    }

    for (const tx of transactions) {
      const date = new Date(tx.date);
      const day = date.getDate();
      const amount = parseInt(tx.amount);

      if (charts[day - 1]) {
        if (tx.type === "income") charts[day - 1].income += amount;
        if (tx.type === "expense") charts[day - 1].expense += amount;
      }
    }

    return charts;
  }

  async getTodayTransaction(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 56, 999);

    const transaction = await Transaction.findAll({
      where: {
        user_id: userId,
        date: { [Op.between]: [today, endOfDay] },
      },
      order: [["date", "DESC"]],
      include: [
        {
          model: Category,
          attributes: ["name", "description"],
          as: "category",
          required: false,
        },
        {
          model: User,
          attributes: ["id", "name", "email", "number"],
          as: "user",
          required: false,
        },
      ],
    });

    return transaction;
  }

  async getTodayExpenseStats(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const transactions = await Transaction.findAll({
      where: {
        user_id: userId,
        type: "expense",
        date: {
          [Op.between]: [today, endOfDay],
        },
      },
      order: [["date", "DESC"]],
    });

    const total = transactions.reduce(
      (sum, tx) => sum + parseInt(tx.amount),
      0,
    );

    return {
      total_expense: total,
      count: transactions.length,
    };
  }
}

export default new TransactionService();
