import { prisma } from './db';

export const adminService = {
  async getDashboardStats() {
    const totalArticles = await prisma.article.count({ where: { isDeleted: false } });
    const publishedArticles = await prisma.article.count({ where: { status: 'Published', isDeleted: false } });
    const draftArticles = await prisma.article.count({ where: { status: 'Draft', isDeleted: false } });
    const articlesInTrash = await prisma.article.count({ where: { isDeleted: true } });
    const totalMagazines = await prisma.magazine.count({ where: { isDeleted: false } });
    const totalSubscribers = await prisma.newsletterSubscriber.count(); // verified or not, count all for now to match old behavior
    const totalMessages = await prisma.contactMessage.count();

    return {
      totalArticles,
      totalMagazines,
      totalSubscribers,
      totalMessages,
      publishedArticles,
      draftArticles,
      articlesInTrash
    };
  },

  async getAnalytics() {
    const articles = await prisma.article.count({ where: { isDeleted: false } });
    const magazines = await prisma.magazine.count({ where: { isDeleted: false } });
    const subscribers = await prisma.newsletterSubscriber.count();
    const contactMessages = await prisma.contactMessage.count();
    
    return {
      articles,
      magazines,
      subscribers,
      contactMessages,
      views: 120500 // Not tracked in DB currently, keep mock
    };
  },

  getRecentActivity() {
    return [
      { id: "1", type: "ARTICLE_PUBLISHED", message: "New article 'Webb Space Telescope' published", timestamp: new Date().toISOString() },
      { id: "2", type: "SUBSCRIBER_JOINED", message: "New subscriber from India", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: "3", type: "MESSAGE_RECEIVED", message: "New contact message regarding partnerships", timestamp: new Date(Date.now() - 7200000).toISOString() }
    ];
  },

  getSettings() {
    return {
      siteName: "Astrospacious",
      contactEmail: "outreach.astrospacious@gmail.com",
      maintenanceMode: false
    };
  },

  updateSettings(data: any) {
    // Mock implementation for updating settings
    return {
      ...this.getSettings(),
      ...data
    };
  }
};
