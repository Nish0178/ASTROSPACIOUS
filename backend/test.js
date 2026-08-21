const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const mags = await prisma.magazine.findMany({
    select: { slug: true, coverImage: true, pdfUrl: true }
  });
  console.log(mags);
}

main().finally(() => prisma.$disconnect());
