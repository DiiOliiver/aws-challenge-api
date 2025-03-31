import { CategoryService } from "../../services/CategoryService";
import { Controller } from "../../contracts/Controller";
import { ok, serverError } from "../../helpers/http";

class FindAllCategoryController implements Controller {
  async handle() {
    try {
      const categories = await CategoryService.getAll();
      return ok(categories);
    } catch {
      return serverError("Failed to list devices");
    }
  }
}

export default FindAllCategoryController;
