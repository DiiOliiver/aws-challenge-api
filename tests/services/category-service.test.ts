import { CategoryRepository } from "../../src/repositories/CategoryRepository";
import { CategoryService } from "../../src/services/CategoryService";
import { DeviceRepository } from "../../src/repositories/DeviceRepository";
import { BadRequest } from "../../src/errors/http";

jest.mock("../../src/repositories/CategoryRepository");
jest.mock("../../src/repositories/DeviceRepository");

describe("CategoryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all categories", async () => {
    const mockCategories = [{ id: 1, name: "Electronics" }];
    (CategoryRepository.find as jest.Mock).mockResolvedValue(mockCategories);

    const result = await CategoryService.getAll();
    expect(result).toEqual(mockCategories);
    expect(CategoryRepository.find).toHaveBeenCalledTimes(1);
  });

  it("should create a new category", async () => {
    const mockCategory = { id: 1, name: "Electronics" };
    (CategoryRepository.create as jest.Mock).mockReturnValue(mockCategory);
    (CategoryRepository.save as jest.Mock).mockResolvedValue(mockCategory);

    const result = await CategoryService.create({ name: "Electronics" });
    expect(result).toEqual(mockCategory);
    expect(CategoryRepository.create).toHaveBeenCalledWith({ name: "Electronics" });
    expect(CategoryRepository.save).toHaveBeenCalledWith(mockCategory);
  });

  it("should not delete a category if linked to devices", async () => {
    (DeviceRepository.count as jest.Mock).mockResolvedValue(1);

    await expect(CategoryService.delete({ params: { id: "1" } } as any)).rejects.toThrow(BadRequest);
    expect(DeviceRepository.count).toHaveBeenCalledWith({ where: { category: { id: 1 } } });
  });

  it("should delete a category if not linked to any devices", async () => {
    (DeviceRepository.count as jest.Mock).mockResolvedValue(0);
    (CategoryRepository.delete as jest.Mock).mockResolvedValue(undefined);

    await expect(CategoryService.delete({ params: { id: "1" } } as any)).resolves.toBeUndefined();
    expect(CategoryRepository.delete).toHaveBeenCalledWith(1);
  });
});
