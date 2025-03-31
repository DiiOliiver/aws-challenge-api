import { Request } from "express";
import { DeviceService } from "../../services/DeviceService";
import { Controller } from "../../contracts/Controller";
import { noContent, serverError } from "../../helpers/http";

class DeleteDeviceController implements Controller {
  async handle(req: Request) {
    try {
      await DeviceService.delete(req);
      return noContent("Device removed successfully");
    } catch {
      return serverError("Failed to delete device");
    }
  }
}

export default DeleteDeviceController;
