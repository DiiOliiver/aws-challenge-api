import express from "express";
import { adaptExpressRoute as adapt } from "../helpers/adaptExpressRoute";
import {
  createDeviceController,
  findAllDeviceController,
  deleteDeviceController,
  deleteListDeviceController,
} from "../controllers/devices";

const router = express.Router();

router.get("/", adapt(findAllDeviceController));
router.post("/", adapt(createDeviceController));
router.delete("/:id", adapt(deleteDeviceController));
router.post("/delete", adapt(deleteListDeviceController));

export default router;
