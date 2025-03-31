import { AppDataSource } from "../config/ormconfig";
import { Category } from "../entities/Category";

export const CategoryRepository = AppDataSource.getRepository(Category);
