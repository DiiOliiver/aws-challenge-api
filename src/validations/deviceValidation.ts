import yup from "../config/yup";
import { DeviceRepository } from "../repositories/DeviceRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";

export const deviceSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3)
    .test(
      "unique-device",
      "A device with this name already exists",
      async (value) => {
        if (!value) return false;
        const existingDevice = await DeviceRepository.findOneBy({
          name: value,
        });
        return !existingDevice;
      },
    )
    .required(),
  category: yup
    .number()
    .test(
      "valid-category",
      "The given category does not exist",
      async (value) => {
        if (!value) return false;
        const categoryExists = await CategoryRepository.findOneBy({
          id: value,
        });
        return !!categoryExists;
      },
    )
    .required(),
  color: yup.string().trim().required(),
  partNumber: yup
    .string()
    .trim()
    .test(
      "unique-part-number",
      "The given part number does not exist",
      async (value) => {
        if (!value) return false;
        const existingPartNumber = await DeviceRepository.findOneBy({
          partNumber: value,
        });
        return !existingPartNumber;
      },
    )
    .required(),
});
