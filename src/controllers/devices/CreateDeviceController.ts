import { Request } from "express";
import { DeviceService } from "../../services/DeviceService";
import { Controller } from "../../contracts/Controller";
import { HttpResponse } from "../../types/HttpResponse";
import { badRequest, created, serverError } from "../../helpers/http";
import { deviceSchema } from "../../validations/deviceValidation";
import yup from "../../config/yup";

class CreateDeviceController implements Controller {
  async handle(req: Request): Promise<HttpResponse> {
    try {
      await deviceSchema.validate(req.body, { abortEarly: false });
      const device = await DeviceService.create(req.body);
      return created(device);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return badRequest(error);
      }
      return serverError("Failed to create device");
    }
  }
}

export default CreateDeviceController;
