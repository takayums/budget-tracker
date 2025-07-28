import HttpError from "@/errors/HttpError";

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
