import dotenv from "dotenv";

dotenv.config({
  path: process.env.DOTENV_PAT || ".env",
});

const dbDialect = "mysql";

export const config = {
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 3306,
    dialect: dbDialect,
  },
  server: {
    baseUrl: process.env.SERVER_BASE_URL || "http://localhost:5001",
    port: parseInt(process.env.SERVER_PORT as string, 10) || 5001,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  llm: {
    gemini: process.env.GEMINI_API_KEY,
    openRouter: process.env.OPEN_ROUTER_API_KEY,
  },
};
