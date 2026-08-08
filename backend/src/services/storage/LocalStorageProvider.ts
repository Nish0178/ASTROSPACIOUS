import fs from "fs";
import path from "path";
import crypto from "crypto";
import { StorageProvider, UploadedFileData, StorageResult } from "./StorageProvider";
import { env } from "../../config/env";

export class LocalStorageProvider implements StorageProvider {
  private baseUploadDir: string;
  private appUrl: string;

  constructor() {
    this.baseUploadDir = path.resolve(process.cwd(), "uploads");
    this.appUrl = process.env.APP_URL || `http://localhost:${env.PORT}`;

    // Ensure base directory exists
    if (!fs.existsSync(this.baseUploadDir)) {
      fs.mkdirSync(this.baseUploadDir, { recursive: true });
    }
  }

  private generateUniqueFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const hash = crypto.randomBytes(16).toString("hex");
    return `${hash}${ext}`;
  }

  async uploadFile(file: UploadedFileData, folder?: string): Promise<StorageResult> {
    const fileName = this.generateUniqueFileName(file.originalName);
    
    // Create folder path if provided
    let targetDir = this.baseUploadDir;
    let relativePath = fileName;

    if (folder) {
      targetDir = path.join(this.baseUploadDir, folder);
      relativePath = `${folder}/${fileName}`;
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
    }

    const fullPath = path.join(targetDir, fileName);

    // Write file locally
    await fs.promises.writeFile(fullPath, file.buffer);

    // Provide a public URL mapping to the express static route (e.g. /uploads/...)
    const publicUrl = `${this.appUrl}/uploads/${relativePath}`;

    return {
      fileName,
      storagePath: relativePath,
      publicUrl
    };
  }

  async deleteFile(storagePath: string): Promise<void> {
    const fullPath = path.join(this.baseUploadDir, storagePath);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  }
}
