export const adminService = {
  getDashboardStats() {
    return {
      totalArticles: 142,
      totalMagazines: 12,
      totalSubscribers: 4059,
      totalMessages: 38,
      publishedArticles: 130,
      draftArticles: 12,
      articlesInTrash: 5
    };
  },

  getAnalytics() {
    return {
      articles: 142,
      magazines: 12,
      subscribers: 4059,
      contactMessages: 38,
      views: 120500
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
