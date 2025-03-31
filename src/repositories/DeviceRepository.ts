import { AppDataSource } from "../config/ormconfig";
import { Device } from "../entities/Device";

export const DeviceRepository = AppDataSource.getRepository(Device);
