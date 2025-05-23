import { ServerError } from "../errors/http";
import { HttpResponse } from "../types/HttpResponse";

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  data,
});

export const noContent = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 204,
  data,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
});

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined),
});
