import express from "express";
import { adaptExpressRoute as adapt } from "../helpers/adaptExpressRoute";
import {
  createCategoryController,
  findAllCategoryController,
  deleteCategoryController,
  deleteListCategoryController,
} from "../controllers/categories";

const router = express.Router();

router.get("/", adapt(findAllCategoryController));
router.post("/", adapt(createCategoryController));
router.delete("/:id", adapt(deleteCategoryController));
router.post("/delete", adapt(deleteListCategoryController));

export default router;
