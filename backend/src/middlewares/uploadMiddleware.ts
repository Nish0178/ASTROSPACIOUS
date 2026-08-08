import multer from "multer";
import { Request } from "express";
import path from "path";

// 1. Configure memory storage
// We use memory storage so we can validate and process files BEFORE saving them to a specific storage provider (Local, S3, R2).
const storage = multer.memoryStorage();

// 2. File filters
const imageFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, WEBP, and SVG are allowed."));
  }
};

const pdfFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDFs are allowed."));
  }
};

// 3. Size Limits
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB

// 4. Exported Middlewares
export const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: imageFilter
});

export const uploadPdf = multer({
  storage,
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: pdfFilter
});
