const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.$queryRaw`SELECT * FROM "Category"`.then(c => console.log(JSON.stringify(c, null, 2))).finally(() => prisma.$disconnect());
