import { Request } from "express";
import { CategoryService } from "../../services/CategoryService";
import { Controller } from "../../contracts/Controller";
import { badRequest, noContent, serverError } from "../../helpers/http";
import { BadRequest } from "../../errors/http";

class DeleteCategoryController implements Controller {
  async handle(req: Request) {
    try {
      await CategoryService.delete(req);
      return noContent("Category removed successfully");
    } catch (error) {
      if (error instanceof BadRequest) {
        return badRequest(error);
      }
      return serverError("Failed to delete category");
    }
  }
}

export default DeleteCategoryController;
