import { prisma } from "./db";
import { Prisma } from "@prisma/client";
import { newsletterService } from "./newsletterService";
export const articleService = {
  
  // Basic helper to generate a slug from a string
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  },

  // Ensure unique slug
  async getUniqueSlug(title: string, excludeId?: string, requestedSlug?: string): Promise<string> {
    if (requestedSlug) {
      const existing = await prisma.article.findUnique({
        where: { slug: requestedSlug }
      });
      if (existing && existing.id !== excludeId) {
        throw new Error("Slug is already taken");
      }
      return requestedSlug;
    }

    const baseSlug = this.generateSlug(title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.article.findUnique({
        where: { slug: uniqueSlug }
      });

      if (!existing || existing.id === excludeId) {
        return uniqueSlug;
      }
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  },

  // Calculate reading time (assuming ~200 words per minute)
  calculateReadingTime(content: string): number {
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  },

  async findArticles(filters: any, pagination: any) {
    const { search, status, featured, category, author, tags } = filters;
    const { page, limit, sort } = pagination;

    const where: Prisma.ArticleWhereInput = {};

    if (status) {
      where.status = status;
    }
    
    where.isDeleted = false;

    if (featured !== undefined && featured !== null) where.featured = featured;
    if (category) where.category = { slug: category };
    if (author) where.author = { id: author };
    if (tags) where.tags = { has: tags }; 

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } }
      ];
    }

    const orderBy: Prisma.ArticleOrderByWithRelationInput = {
      createdAt: sort === "Oldest" ? "asc" : "desc"
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          author: { select: { id: true, name: true } }
        }
      }),
      prisma.article.count({ where })
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

  async getTrashArticles(filters: any, pagination: any) {
    const { search } = filters;
    const { page, limit, sort } = pagination;

    const where: Prisma.ArticleWhereInput = {
      isDeleted: true
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } }
      ];
    }
    
    if (filters.author) where.author = { id: filters.author };
    if (filters.category) where.category = { slug: filters.category };

    const orderBy: Prisma.ArticleOrderByWithRelationInput = {
      deletedAt: sort === "Oldest" ? "asc" : "desc"
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          author: { select: { id: true, name: true } }
        }
      }),
      prisma.article.count({ where })
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

  async getArticleByIdOrSlug(identifier: string, requirePublished = false) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const where: Prisma.ArticleWhereInput = isUuid 
      ? { id: identifier }
      : { slug: identifier };
      
    if (requirePublished) {
      where.status = "Published";
    }

    return prisma.article.findFirst({
      where,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author: { select: { id: true, name: true, bio: true, photo: true } }
      }
    });
  },

  async createArticle(data: any) {
    const slug = await this.getUniqueSlug(data.title, undefined, data.slug);
    const readingTime = this.calculateReadingTime(data.content);
    
    let publishedAt = null;
    if (data.status === "Published") {
      publishedAt = new Date();
    }

    return prisma.article.create({
      data: {
        ...data,
        slug,
        readingTime,
        publishedAt
      }
    });
  },

  async updateArticle(id: string, data: any) {
    let updateData = { ...data };
    let newlyPublished = false;

    if (data.title || data.slug) {
      updateData.slug = await this.getUniqueSlug(data.title || "", id, data.slug);
    }
    
    if (data.content) {
      updateData.readingTime = this.calculateReadingTime(data.content);
    }

    if (data.status === "Published") {
      const existing = await prisma.article.findUnique({ where: { id }, select: { status: true, publishedAt: true }});
      if (existing?.status !== "Published") {
        newlyPublished = true;
      }
      if (!existing?.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const updated = await prisma.article.update({
      where: { id },
      data: updateData
    });

    if (newlyPublished) {
      newsletterService.broadcastNewArticle(updated).catch(console.error);
    }

    return updated;
  },

  async softDeleteArticle(id: string, adminId: string) {
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) throw new Error("Article not found");
    
    return prisma.article.update({
      where: { id },
      data: { 
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId
      }
    });
  },
  
  async restoreArticle(id: string, adminId: string) {
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) throw new Error("Article not found");
    
    return prisma.article.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
        restoredAt: new Date(),
        restoredBy: adminId
      }
    });
  },

  async hardDeleteArticle(id: string) {
    return prisma.article.delete({ where: { id } });
  },

  async bulkTrashArticles(ids: string[], adminId: string) {
    // Need to do this sequentially or individually to preserve previous status
    const promises = ids.map(id => this.softDeleteArticle(id, adminId));
    return Promise.allSettled(promises);
  },

  async bulkRestoreArticles(ids: string[], adminId: string) {
    const promises = ids.map(id => this.restoreArticle(id, adminId));
    return Promise.allSettled(promises);
  },

  async bulkHardDeleteArticles(ids: string[]) {
    return prisma.article.deleteMany({
      where: { id: { in: ids } }
    });
  }
};
