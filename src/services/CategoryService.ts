import { CategoryRepository } from "../repositories/CategoryRepository";
import { Category } from "../entities/Category";
import { Request } from "express";

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
    await CategoryRepository.delete(id);
  }
}
