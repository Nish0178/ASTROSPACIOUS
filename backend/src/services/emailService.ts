import { Resend } from "resend";
import { env } from "../config/env";
import { buildVerificationEmail } from "../emails/verification/verifyEmail";
import { buildNewArticleEmail } from "../emails/article/newArticle";
import { buildNewMagazineEmail } from "../emails/magazine/newMagazine";
import { buildAdminContactNotification } from "../emails/contact/adminNotification";
import { buildContactAutoReply } from "../emails/contact/autoReply";

const resend = new Resend(env.RESEND_API_KEY || "dummy_key");
const FROM_EMAIL = "Astrospacious <newsletter@astrospacious.com>"; 
const APP_URL = process.env.APP_URL || "http://localhost:5173"; 

export const emailService = {
  
  async sendVerificationEmail(email: string, token: string) {
    if (!env.RESEND_API_KEY) {
      console.log(`[Mock Email] Verification for ${email} with token ${token}`);
      return;
    }

    const html = buildVerificationEmail({ token, appUrl: APP_URL });

    return resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify Your Astrospacious Subscription",
      html
    });
  },

  async sendNewArticleEmail(sub: { email: string, unsubscribeToken: string }, article: any) {
    if (!env.RESEND_API_KEY) {
      console.log(`[Mock Email] Broadcast article: ${article.title} to ${sub.email}`);
      return { id: "mock_id_article" };
    }

    const html = buildNewArticleEmail({
      title: article.title,
      description: article.description,
      coverImage: article.coverImage,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      slug: article.slug,
      appUrl: APP_URL,
      unsubscribeLink: `${APP_URL}/api/v1/newsletter/unsubscribe/${sub.unsubscribeToken}`
    });

    return resend.emails.send({
      from: FROM_EMAIL,
      to: sub.email,
      subject: `New Article: ${article.title}`,
      html
    });
  },

  async sendNewMagazineEmail(sub: { email: string, unsubscribeToken: string }, magazine: any) {
    if (!env.RESEND_API_KEY) {
      console.log(`[Mock Email] Broadcast magazine: ${magazine.title} to ${sub.email}`);
      return { id: "mock_id_magazine" };
    }

    const html = buildNewMagazineEmail({
      title: magazine.title,
      description: magazine.description,
      coverImage: magazine.coverImage,
      publishedAt: magazine.publishedAt,
      slug: magazine.slug,
      appUrl: APP_URL,
      unsubscribeLink: `${APP_URL}/api/v1/newsletter/unsubscribe/${sub.unsubscribeToken}`
    });

    return resend.emails.send({
      from: FROM_EMAIL,
      to: sub.email,
      subject: `New Magazine Issue: ${magazine.title}`,
      html
    });
  },

  async sendContactAdminNotification(contactMessage: any) {
    if (!env.RESEND_API_KEY) {
      console.log(`[Mock Email] Admin Notification for Contact Message ID: ${contactMessage.id}`);
      return;
    }

    const html = buildAdminContactNotification({
      id: contactMessage.id,
      firstName: contactMessage.firstName,
      lastName: contactMessage.lastName,
      email: contactMessage.email,
      phone: contactMessage.phone,
      category: contactMessage.category,
      subject: contactMessage.subject,
      message: contactMessage.message,
      appUrl: APP_URL
    });

    return resend.emails.send({
      from: FROM_EMAIL,
      to: "newsletter@astrospacious.com", // Or admin email
      subject: `New Contact: ${contactMessage.subject}`,
      html
    });
  },

  async sendContactAutoReply(contactMessage: any) {
    if (!env.RESEND_API_KEY) {
      console.log(`[Mock Email] Auto-Reply for Contact Message ID: ${contactMessage.id}`);
      return;
    }

    const html = buildContactAutoReply({
      firstName: contactMessage.firstName,
      subject: contactMessage.subject,
      appUrl: APP_URL
    });

    return resend.emails.send({
      from: FROM_EMAIL,
      to: contactMessage.email,
      subject: "We received your message - Astrospacious",
      html
    });
  }
};
