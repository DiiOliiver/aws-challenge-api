import { DeviceService } from "../../src/services/DeviceService";
import { DeviceRepository } from "../../src/repositories/DeviceRepository";
import { Device } from "../../src/entities/Device";

jest.mock("../../src/repositories/DeviceRepository");

describe("DeviceService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a device", async () => {
    const newDevice: Partial<Device> = {
      name: "iPhone 14",
      color: "Black",
      partNumber: "A1234",
      category: { id: 1 } as any,
    };

    const savedDevice = { ...newDevice, id: 1 } as Device;

    (DeviceRepository.create as jest.Mock).mockReturnValue(savedDevice);
    (DeviceRepository.save as jest.Mock).mockResolvedValue(savedDevice);

    const result = await DeviceService.create(newDevice);
    expect(result).toEqual(savedDevice);
    expect(DeviceRepository.create).toHaveBeenCalledWith(newDevice);
    expect(DeviceRepository.save).toHaveBeenCalledWith(savedDevice);
  });

  it("should delete a device by id", async () => {
    const req = { params: { id: "1" } } as any;
    (DeviceRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    await DeviceService.delete(req);
    expect(DeviceRepository.delete).toHaveBeenCalledWith(1);
  });
});
