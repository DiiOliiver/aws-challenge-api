import { Request } from "express";
import { CategoryService } from "../../services/CategoryService";
import { Controller } from "../../contracts/Controller";
import { badRequest, serverError } from "../../helpers/http";
import { BadRequest } from "../../errors/http";

class DeleteListCategoryController implements Controller {
  async handle(req: Request) {
    try {
      return await CategoryService.deleteList(req);
    } catch (error) {
      if (error instanceof BadRequest) {
        return badRequest(error);
      }
      return serverError("Failed to delete categories");
    }
  }
}

export default DeleteListCategoryController;
