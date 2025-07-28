import HttpError from "@/errors/HttpError";

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
