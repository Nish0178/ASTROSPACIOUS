import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const mag = await prisma.magazine.findUnique({
    where: { slug: 'mystery-of-sopdet-volume-01-issue-001' }
  });
  console.log('PDF URL:', mag?.pdfUrl);
}
main().finally(() => prisma.$disconnect());
