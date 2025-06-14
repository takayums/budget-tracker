import HttpError from "./HttpError";

class ServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = "ServerError";
  }
}

export default ServerError;
