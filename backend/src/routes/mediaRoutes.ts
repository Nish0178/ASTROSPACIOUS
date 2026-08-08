import { Router } from "express";
import { mediaController } from "../controllers/mediaController";
import { uploadImage, uploadPdf } from "../middlewares/uploadMiddleware";

const router = Router();

// Routes mounted under /api/v1/media (or /admin/media)
// Note: Authentication is enforced upstream at the admin router level.

router.post("/upload/image", uploadImage.single("file"), mediaController.uploadImage);
router.post("/upload/pdf", uploadPdf.single("file"), mediaController.uploadPdf);

router.get("/", mediaController.getMediaList);
router.get("/:id", mediaController.getMedia);
router.delete("/:id", mediaController.deleteMedia);

export default router;
