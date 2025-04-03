import { DeviceRepository } from "../repositories/DeviceRepository";
import { Device } from "../entities/Device";
import { Request } from "express";

export class DeviceService {
  static async findAll(): Promise<Device[]> {
    return await DeviceRepository.find();
  }

  static async create(deviceData: Partial<Device>): Promise<Device> {
    const device = DeviceRepository.create(deviceData);
    return await DeviceRepository.save(device);
  }

  static async delete(req: Request): Promise<void> {
    const id = Number(req.params["id"]);
    await DeviceRepository.delete(id);
  }

  static async deleteList(req: Request): Promise<void> {
    await DeviceRepository.delete(req.body.ids);
  }
}
