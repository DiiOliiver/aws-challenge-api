import { Router } from "express";
import deviceRoutes from "./deviceRoutes";
import categoryRoutes from "./categoryRoutes";

const router = Router();

router.use("/devices", deviceRoutes);
router.use("/categories", categoryRoutes);

export default router;
