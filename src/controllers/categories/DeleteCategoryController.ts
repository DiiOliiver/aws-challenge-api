import { Request } from "express";
import { CategoryService } from "../../services/CategoryService";
import { Controller } from "../../contracts/Controller";
import { noContent, serverError } from "../../helpers/http";

class DeleteCategoryController implements Controller {
  async handle(req: Request) {
    try {
      await CategoryService.delete(req);
      return noContent("Category removed successfully");
    } catch {
      return serverError("Failed to delete category");
    }
  }
}

export default DeleteCategoryController;
