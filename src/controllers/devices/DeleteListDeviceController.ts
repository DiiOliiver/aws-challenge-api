import { Request } from "express";
import { DeviceService } from "../../services/DeviceService";
import { Controller } from "../../contracts/Controller";
import { noContent, serverError } from "../../helpers/http";

class DeleteListDeviceController implements Controller {
  async handle(req: Request) {
    try {
      await DeviceService.deleteList(req);
      return noContent("Devices removed successfully");
    } catch {
      return serverError("Failed to delete devices");
    }
  }
}

export default DeleteListDeviceController;
