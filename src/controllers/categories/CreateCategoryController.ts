import { Request } from "express";
import { CategoryService } from "../../services/CategoryService";
import { Controller } from "../../contracts/Controller";
import { created, serverError } from "../../helpers/http";

class CreateCategoryController implements Controller {
  async handle(req: Request) {
    try {
      const category = await CategoryService.create(req.body);
      return created(category);
    } catch {
      return serverError("Failed to create category");
    }
  }
}

export default CreateCategoryController;
