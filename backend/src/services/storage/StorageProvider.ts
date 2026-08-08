export interface UploadedFileData {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface StorageResult {
  fileName: string;
  storagePath: string;
  publicUrl: string;
}

export interface StorageProvider {
  /**
   * Uploads a file to the storage provider.
   * @param file The file data buffer and metadata
   * @param folder Optional subfolder prefix (e.g., 'images', 'pdfs')
   * @returns StorageResult containing the stored file name, path, and public URL
   */
  uploadFile(file: UploadedFileData, folder?: string): Promise<StorageResult>;

  /**
   * Deletes a file from the storage provider.
   * @param storagePath The relative path or key returned during upload
   */
  deleteFile(storagePath: string): Promise<void>;
}
