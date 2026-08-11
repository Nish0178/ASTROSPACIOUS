import { prisma } from "./db";
import { Prisma } from "@prisma/client";
import { LocalStorageProvider } from "./storage/LocalStorageProvider";
import { StorageProvider } from "./storage/StorageProvider";

// Abstract the storage provider so it can be swapped later (e.g. to S3StorageProvider)
const storageProvider: StorageProvider = new LocalStorageProvider();

export const mediaService = {

  async uploadFile(file: Express.Multer.File, uploaderId: string, folder: "images" | "pdfs") {
    const storageResult = await storageProvider.uploadFile({
      buffer: file.buffer,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    }, folder);

    // Save metadata in DB
    return prisma.media.create({
      data: {
        fileName: storageResult.fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
        storagePath: storageResult.storagePath,
        publicUrl: storageResult.publicUrl,
        uploadedBy: uploaderId,
        status: "Active"
      }
    });
  },

  async findMedia(filters: any, pagination: any) {
    const { search, mimeType, uploaderId, status } = filters;
    const { page, limit, sort } = pagination;

    const where: Prisma.MediaWhereInput = {};

    if (status) where.status = status;
    else where.status = "Active"; // Default to Active only

    if (mimeType) where.mimeType = { contains: mimeType };
    if (uploaderId) where.uploadedBy = uploaderId;

    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: "insensitive" } },
        { fileName: { contains: search, mode: "insensitive" } }
      ];
    }

    const orderBy: Prisma.MediaOrderByWithRelationInput = {
      createdAt: sort === "Oldest" ? "asc" : "desc"
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.media.count({ where })
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async getMediaById(id: string) {
    return prisma.media.findUnique({
      where: { id }
    });
  },

  async softDeleteMedia(id: string) {
    return prisma.media.update({
      where: { id },
      data: { status: "Archived" }
    });
  }
};
