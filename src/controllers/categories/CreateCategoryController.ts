import { Request } from "express";
import { CategoryService } from "../../services/CategoryService";
import { Controller } from "../../contracts/Controller";
import { badRequest, created, serverError } from "../../helpers/http";
import { categorySchema } from "../../validations/categoryValidation";
import yup from "../../config/yup";

class CreateCategoryController implements Controller {
  async handle(req: Request) {
    try {
      await categorySchema.validate(req.body, { abortEarly: false });
      const category = await CategoryService.create(req.body);
      return created(category);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return badRequest(error);
      }
      return serverError("Failed to create category");
    }
  }
}

export default CreateCategoryController;
