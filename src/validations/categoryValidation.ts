import yup from "../config/yup";
import { CategoryRepository } from "../repositories/CategoryRepository";

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3)
    .max(128)
    .test(
      "unique-category",
      "A category with this name already exists",
      async (value) => {
        if (!value) return false;
        const existingCategory = await CategoryRepository.findOneBy({
          name: value,
        });
        return !existingCategory;
      },
    )
    .required(),
});
