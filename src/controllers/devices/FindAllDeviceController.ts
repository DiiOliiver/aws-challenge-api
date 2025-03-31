import { DeviceService } from "../../services/DeviceService";
import { ok, serverError } from "../../helpers/http";
import { Controller } from "../../contracts/Controller";

class FindAllDeviceController implements Controller {
  async handle() {
    try {
      const devices = await DeviceService.findAll();
      return ok(devices);
    } catch {
      return serverError("Failed to list devices");
    }
  }
}

export default FindAllDeviceController;
