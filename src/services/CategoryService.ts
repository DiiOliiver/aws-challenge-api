import { CategoryRepository } from "../repositories/CategoryRepository";
import { Category } from "../entities/Category";
import { Request } from "express";
import { DeviceRepository } from "../repositories/DeviceRepository";
import { BadRequest } from "../errors/http";
import { AppDataSource } from "../config/ormconfig";
import { ok } from "../helpers/http";
import { Device } from "../entities/Device";

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    return await AppDataSource.createQueryBuilder(Category, "categories")
      .leftJoinAndSelect(Device, "device", "device.category.id = categories.id")
      .select([
        "categories.id AS id",
        "categories.name AS name",
        "COUNT(device.id) AS total",
      ])
      .groupBy("categories.id")
      .getRawMany();
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
      throw new BadRequest("Unable to delete a category linked to devices");
    }
    await CategoryRepository.delete(id);
  }

  static async deleteList(req: Request) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const id of req.body.ids) {
        const hasDevices = await DeviceRepository.count({
          where: { category: { id } },
        });

        if (hasDevices > 0) {
          throw new BadRequest("Unable to delete a category linked to devices");
        }

        await queryRunner.manager.delete("Category", id);
      }

      await queryRunner.commitTransaction();
      return ok("Categories deleted successfully");
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
