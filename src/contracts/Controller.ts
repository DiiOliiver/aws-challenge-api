import { HttpResponse } from "../types/HttpResponse";

export interface Controller<RQ = any, RS = any> {
  handle(_req: RQ, _res: RS): Promise<HttpResponse>;
}
