import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import path from "path";
import crypto from "crypto";
import { StorageProvider, UploadedFileData, StorageResult } from "./StorageProvider";

export class CloudinaryStorageProvider implements StorageProvider {
  constructor() {
    // Cloudinary expects process.env.CLOUDINARY_URL or explicit config.
    // Assuming CLOUDINARY_URL is present in the environment or set explicitly.
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      // If CLOUDINARY_URL is provided, it will automatically override the above.
    });
  }

  private generateUniqueFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const hash = crypto.randomBytes(16).toString("hex");
    return `${hash}${ext}`;
  }

  async uploadFile(file: UploadedFileData, folder?: string): Promise<StorageResult> {
    const fileName = this.generateUniqueFileName(file.originalName);
    // Cloudinary public_id doesn't need extension, but we can pass it if we want.
    // It's cleaner to let Cloudinary handle extensions for format conversion.
    const publicId = path.basename(fileName, path.extname(fileName));

    // For PDFs and non-image files, resource_type should be "raw" or "auto"
    const isPdf = file.mimeType === "application/pdf";
    const resourceType = isPdf ? "raw" : "auto";

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder || "general",
          public_id: publicId,
          resource_type: resourceType,
          // Add the original extension to raw files so they are downloadable with correct ext
          ...(isPdf ? { format: "pdf" } : {})
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          
          if (!result) {
            return reject(new Error("Cloudinary upload returned no result"));
          }

          resolve({
            fileName: `${publicId}${path.extname(file.originalName)}`,
            storagePath: result.public_id,
            publicUrl: result.secure_url
          });
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(storagePath: string): Promise<void> {
    // Determine if it's raw or image based on extension or path conventions
    // Cloudinary requires resource_type to delete raw files
    const isPdf = storagePath.endsWith(".pdf");
    await cloudinary.uploader.destroy(storagePath, {
      resource_type: isPdf ? "raw" : "image"
    });
  }
}
