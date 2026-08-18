import { prisma } from "./db";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import { emailService } from "./emailService";

export const newsletterService = {
  
  generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  },

  async subscribe(email: string) {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (existing.verified) {
        throw new Error("You are already subscribed to the newsletter.");
      } else {
        // Resend verification email
        const token = existing.verificationToken || this.generateToken();
        if (!existing.verificationToken) {
          await prisma.newsletterSubscriber.update({
            where: { email },
            data: { verificationToken: token }
          });
        }
        await emailService.sendVerificationEmail(email, token);
        return { message: "Verification email resent. Please check your inbox." };
      }
    }

    const verificationToken = this.generateToken();
    const unsubscribeToken = this.generateToken();

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        verificationToken,
        unsubscribeToken
      }
    });

    await emailService.sendVerificationEmail(email, verificationToken);
    
    return { message: "Successfully subscribed! Please check your email to verify your subscription." };
  },

  async verify(token: string) {
    const cleanToken = token ? token.trim() : "";
    
    if (!cleanToken) {
      throw new Error("Invalid or missing verification token.");
    }

    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: { verificationToken: cleanToken }
    });

    if (!subscriber) {
      console.error(`[Verify Error] Token not found. Prefix: ${cleanToken.substring(0, 6)}...`);
      throw new Error("Invalid or expired verification token.");
    }

    if (subscriber.verified) {
      return { message: "Email is already verified." };
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        verified: true,
        verificationToken: null
      }
    });

    return { message: "Email successfully verified. Welcome to Astrospacious!" };
  },

  async unsubscribe(token: string) {
    const cleanToken = token ? token.trim() : "";

    if (!cleanToken) {
      throw new Error("Invalid or missing unsubscribe token.");
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: cleanToken }
    });

    if (!subscriber) {
      console.error(`[Unsubscribe Error] Token not found. Prefix: ${cleanToken.substring(0, 6)}...`);
      throw new Error("Invalid unsubscribe token.");
    }

    // We can soft delete or actually delete. The requirements say "One click removes the subscription or marks it inactive."
    // Since we don't have an "inactive" status, let's delete them.
    await prisma.newsletterSubscriber.delete({
      where: { id: subscriber.id }
    });

    return { message: "You have been successfully unsubscribed." };
  },

  async broadcastNewArticle(article: any) {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { verified: true, unsubscribeToken: { not: null } },
      select: { email: true, unsubscribeToken: true }
    });

    let targetSubscribers = subscribers as { email: string, unsubscribeToken: string }[];

    // Development Test Mode
    if (process.env.NODE_ENV === "development") {
      const testEmail = process.env.TEST_EMAIL;
      if (testEmail) {
        console.log(`[TEST MODE] Routing all broadcast emails to ${testEmail}`);
        targetSubscribers = [{ email: testEmail, unsubscribeToken: "dev-test-token" }];
      } else {
        console.log(`[TEST MODE] No TEST_EMAIL provided. Taking first subscriber for safety.`);
        targetSubscribers = targetSubscribers.slice(0, 1);
      }
    }

    // Asynchronously iterate so it doesn't block caller
    for (const sub of targetSubscribers) {
      try {
        await emailService.sendNewArticleEmail(sub, article);
        await prisma.emailLog.create({
          data: { emailType: "ARTICLE_BROADCAST", recipient: sub.email, status: "SENT" }
        });
      } catch (error: any) {
        console.error(`Failed sending article to ${sub.email}:`, error);
        await prisma.emailLog.create({
          data: { emailType: "ARTICLE_BROADCAST", recipient: sub.email, status: "FAILED", failureReason: error.message || "Unknown error" }
        });
      }
    }
  },

  async broadcastNewMagazine(magazine: any) {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { verified: true, unsubscribeToken: { not: null } },
      select: { email: true, unsubscribeToken: true }
    });

    let targetSubscribers = subscribers as { email: string, unsubscribeToken: string }[];

    // Development Test Mode
    if (process.env.NODE_ENV === "development") {
      const testEmail = process.env.TEST_EMAIL;
      if (testEmail) {
        console.log(`[TEST MODE] Routing all broadcast emails to ${testEmail}`);
        targetSubscribers = [{ email: testEmail, unsubscribeToken: "dev-test-token" }];
      } else {
        console.log(`[TEST MODE] No TEST_EMAIL provided. Taking first subscriber for safety.`);
        targetSubscribers = targetSubscribers.slice(0, 1);
      }
    }

    for (const sub of targetSubscribers) {
      try {
        await emailService.sendNewMagazineEmail(sub, magazine);
        await prisma.emailLog.create({
          data: { emailType: "MAGAZINE_BROADCAST", recipient: sub.email, status: "SENT" }
        });
      } catch (error: any) {
        console.error(`Failed sending magazine to ${sub.email}:`, error);
        await prisma.emailLog.create({
          data: { emailType: "MAGAZINE_BROADCAST", recipient: sub.email, status: "FAILED", failureReason: error.message || "Unknown error" }
        });
      }
    }
  },

  async findSubscribers(filters: any, pagination: any) {
    const { search, status } = filters;
    const { page, limit, sort } = pagination;

    const where: Prisma.NewsletterSubscriberWhereInput = {};

    if (status === "Verified") where.verified = true;
    if (status === "Unverified") where.verified = false;

    if (search) {
      where.email = { contains: search, mode: "insensitive" };
    }

    const orderBy: Prisma.NewsletterSubscriberOrderByWithRelationInput = {
      subscribedAt: sort === "Oldest" ? "asc" : "desc"
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          verified: true,
          subscribedAt: true
        }
      }),
      prisma.newsletterSubscriber.count({ where })
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

  async getVerifiedCount() {
    return prisma.newsletterSubscriber.count({
      where: { verified: true }
    });
  },

  async deleteSubscriber(id: string) {
    return prisma.newsletterSubscriber.delete({
      where: { id }
    });
  },

  async exportToCSV() {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      select: {
        id: true,
        email: true,
        verified: true,
        subscribedAt: true
      },
      orderBy: { subscribedAt: "desc" }
    });
    
    return subscribers;
  }
};
