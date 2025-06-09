import HttpError from "./HttpError";

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
