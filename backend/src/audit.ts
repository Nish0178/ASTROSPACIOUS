import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function audit() {
  try {
    const totalArticles = await prisma.article.count({ where: { isDeleted: false } });
    const publishedArticles = await prisma.article.count({ where: { status: 'Published', isDeleted: false } });
    const draftArticles = await prisma.article.count({ where: { status: 'Draft', isDeleted: false } });
    const articlesInTrash = await prisma.article.count({ where: { isDeleted: true } });
    const totalMagazines = await prisma.magazine.count({ where: { isDeleted: false } });
    const totalSubscribers = await prisma.newsletterSubscriber.count();
    const verifiedSubscribers = await prisma.newsletterSubscriber.count({ where: { verified: true } });
    const totalMessages = await prisma.contactMessage.count();
    
    console.log(JSON.stringify({
      totalArticles,
      publishedArticles,
      draftArticles,
      articlesInTrash,
      totalMagazines,
      totalSubscribers,
      verifiedSubscribers,
      totalMessages
    }, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

audit();
