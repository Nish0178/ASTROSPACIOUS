import { prisma } from "./db";
import { Prisma } from "@prisma/client";
import { newsletterService } from "./newsletterService";
export const magazineService = {
  
  generateSlug(title: string, volume?: string, issueNumber?: string): string {
    const parts = [title];
    if (volume) parts.push(`volume-${volume}`);
    if (issueNumber) parts.push(`issue-${issueNumber}`);
    
    return parts.join("-")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  },

  async getUniqueSlug(title: string, volume?: string, issueNumber?: string, excludeId?: string): Promise<string> {
    const baseSlug = this.generateSlug(title, volume, issueNumber);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.magazine.findUnique({
        where: { slug: uniqueSlug }
      });

      if (!existing || existing.id === excludeId) {
        return uniqueSlug;
      }
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  },

  async findMagazines(filters: any, pagination: any) {
    const { search, status, featured, category, volume, issueNumber, tags } = filters;
    const { page, limit, sort } = pagination;

    const where: Prisma.MagazineWhereInput = {
      isDeleted: false
    };

    if (status) where.status = status;
    if (featured !== undefined && featured !== null) where.featured = featured;
    if (category) where.category = category;
    if (volume) where.volume = volume;
    if (issueNumber) where.issueNumber = issueNumber;
    if (tags) where.tags = { has: tags }; 

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } }
      ];
    }

    const orderBy: Prisma.MagazineOrderByWithRelationInput = {
      createdAt: sort === "Oldest" ? "asc" : "desc"
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.magazine.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.magazine.count({ where })
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

  async findTrashMagazines(filters: any, pagination: any) {
    const { search, sort } = filters;
    const { page, limit } = pagination;

    const where: Prisma.MagazineWhereInput = {
      isDeleted: true
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } }
      ];
    }

    const orderBy: Prisma.MagazineOrderByWithRelationInput = {
      deletedAt: sort === "Oldest" ? "asc" : "desc"
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.magazine.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.magazine.count({ where })
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

  async getMagazineByIdOrSlug(identifier: string, requirePublished = false) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const where: Prisma.MagazineWhereInput = isUuid 
      ? { id: identifier }
      : { slug: identifier };
      
    where.isDeleted = false;

    if (requirePublished) {
      where.status = "Published";
    }

    return prisma.magazine.findFirst({ where });
  },

  async createMagazine(data: any) {
    const slug = await this.getUniqueSlug(data.title, data.volume, data.issueNumber);
    
    let publishedAt = null;
    if (data.status === "Published") {
      publishedAt = new Date();
    }

    return prisma.magazine.create({
      data: {
        ...data,
        slug,
        publishedAt
      }
    });
  },

  async updateMagazine(id: string, data: any) {
    let updateData = { ...data };
    let newlyPublished = false;

    if (data.title || data.volume || data.issueNumber) {
      const existing = await prisma.magazine.findUnique({ where: { id }});
      if (existing) {
        const title = data.title || existing.title;
        const volume = data.volume !== undefined ? data.volume : existing.volume;
        const issueNumber = data.issueNumber !== undefined ? data.issueNumber : existing.issueNumber;
        updateData.slug = await this.getUniqueSlug(title, volume || undefined, issueNumber || undefined, id);
      }
    }
    
    if (data.status === "Published") {
      const existing = await prisma.magazine.findUnique({ where: { id }, select: { status: true, publishedAt: true }});
      if (existing?.status !== "Published") {
        newlyPublished = true;
      }
      if (!existing?.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const updated = await prisma.magazine.update({
      where: { id },
      data: updateData
    });

    if (newlyPublished) {
      newsletterService.broadcastNewMagazine(updated).catch(console.error);
    }

    return updated;
  },

  async softDeleteMagazine(id: string, userId?: string) {
    const magazine = await prisma.magazine.findUnique({ where: { id } });
    if (!magazine) throw new Error("Magazine not found");
    
    return prisma.magazine.update({
      where: { id },
      data: { 
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId,
        previousStatus: magazine.status,
        status: "Archived"
      }
    });
  },

  async restoreMagazine(id: string, userId?: string) {
    const magazine = await prisma.magazine.findUnique({ where: { id } });
    if (!magazine) throw new Error("Magazine not found");
    
    return prisma.magazine.update({
      where: { id },
      data: { 
        isDeleted: false,
        restoredAt: new Date(),
        restoredBy: userId,
        status: magazine.previousStatus || "Draft",
        previousStatus: null
      }
    });
  },

  async hardDeleteMagazine(id: string) {
    return prisma.magazine.delete({
      where: { id }
    });
  }
};
