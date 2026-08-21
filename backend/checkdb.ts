import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const m = await prisma.magazine.findUnique({where: {slug: 'mystery-of-sopdet-volume-01-issue-001'}});
  console.log(m?.pdfUrl);
}
main().finally(() => prisma.$disconnect());
