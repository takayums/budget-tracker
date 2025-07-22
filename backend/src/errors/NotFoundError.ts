import HttpError from "@/errors/HttpError";

class NotFoundError extends HttpError {
  constructor(message: string = "Not Found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
