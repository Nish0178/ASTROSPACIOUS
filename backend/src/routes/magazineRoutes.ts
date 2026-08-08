import { Router } from "express";
import { magazineController } from "../controllers/magazineController";

const router = Router();

router.get("/", magazineController.getMagazines);
router.get("/:id", magazineController.getMagazine);

export default router;
