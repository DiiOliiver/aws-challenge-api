export class ServerError extends Error {
  constructor(error?: Error) {
    super("Server failed. Try again soon");
    this.name = "ServerError";
    this.stack = error?.stack;
  }
}

export class BadRequest extends Error {
  constructor(error?: Error) {
    super(error?.message);
    this.name = "BadRequest";
    this.stack = error?.stack;
  }
}
