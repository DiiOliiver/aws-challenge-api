import { CategoryRepository } from "../repositories/CategoryRepository";
import { Category } from "../entities/Category";
import { Request } from "express";
import { DeviceRepository } from "../repositories/DeviceRepository";
import { BadRequest } from "../errors/http";

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    return await CategoryRepository.find();
  }

  static async create(data: Partial<Category>): Promise<Category> {
    const category = CategoryRepository.create(data);
    return await CategoryRepository.save(category);
  }

  static async delete(req: Request): Promise<void> {
    const id = Number(req.params["id"]);
    const hasDevices = await DeviceRepository.count({
      where: { category: { id } },
    });
    if (hasDevices > 0) {
      const error = new Error("Unable to delete a category linked to devices");
      throw new BadRequest(error);
    }
    await CategoryRepository.delete(id);
  }
}
