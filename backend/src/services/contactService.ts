import { prisma } from "./db";
import { emailService } from "./emailService";
import { Prisma } from "@prisma/client";

export const contactService = {
  async submitMessage(data: any) {
    const message = await prisma.contactMessage.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        category: data.category,
        message: data.message,
        status: "NEW"
      }
    });

    // Send Admin Notification & Visitor Auto-reply asynchronously
    emailService.sendContactAdminNotification(message).catch(console.error);
    emailService.sendContactAutoReply(message).catch(console.error);

    return message;
  },

  async updateMessageStatus(id: string, status: string) {
    return prisma.contactMessage.update({
      where: { id },
      data: { status }
    });
  },

  async softDeleteMessage(id: string) {
    return prisma.contactMessage.update({
      where: { id },
      data: { status: "ARCHIVED" }
    });
  },

  async getMessageById(id: string) {
    return prisma.contactMessage.findUnique({
      where: { id }
    });
  },

  async getMessages(filters: any, pagination: any) {
    const { search, status } = filters;
    const { page, limit, sort } = pagination;

    const where: Prisma.ContactMessageWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } }
      ];
    }

    let orderBy: Prisma.ContactMessageOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "Oldest First") orderBy = { createdAt: "asc" };
    else if (sort === "Alphabetical") orderBy = { lastName: "asc" };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.contactMessage.count({ where })
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

  async getAnalytics() {
    const now = new Date();
    
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Get last 7 days for "This Week" approximation
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const [total, newMsg, resolved, archived, today, thisWeek] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.contactMessage.count({ where: { status: "RESOLVED" } }),
      prisma.contactMessage.count({ where: { status: "ARCHIVED" } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfWeek } } })
    ]);

    return {
      totalMessages: total,
      newMessages: newMsg,
      resolvedMessages: resolved,
      archivedMessages: archived,
      todayMessages: today,
      thisWeekMessages: thisWeek
    };
  },

  async exportToCSV() {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      where: { status: { not: "ARCHIVED" } }
    });
    return messages;
  }
};
