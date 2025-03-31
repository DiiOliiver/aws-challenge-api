import { Adapter } from "../types/Adapter";

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle(req, res);
  const json = [200, 201, 204].includes(statusCode)
    ? data
    : { error: data.message };
  res.status(statusCode).json(json);
};
