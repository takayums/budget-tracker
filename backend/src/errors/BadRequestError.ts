import HttpError from "@/errors/HttpError";

class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;
