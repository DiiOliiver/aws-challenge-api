import { Request } from "express";
import { DeviceService } from "../../services/DeviceService";
import { Controller } from "../../contracts/Controller";
import { HttpResponse } from "../../types/HttpResponse";
import { created, serverError } from "../../helpers/http";

class CreateDeviceController implements Controller {
  async handle(req: Request): Promise<HttpResponse> {
    try {
      const device = await DeviceService.create(req.body);
      return created(device);
    } catch {
      return serverError("Failed to create device");
    }
  }
}

export default CreateDeviceController;
