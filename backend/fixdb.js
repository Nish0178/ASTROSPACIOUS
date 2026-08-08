const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

async function fixDB() {
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    if (cat.id === "") {
      console.log("Found empty string ID category! Deleting and re-creating...");
      await prisma.category.delete({ where: { id: "" } });
      const newCat = await prisma.category.create({
        data: {
          id: crypto.randomUUID(),
          name: cat.name,
          slug: cat.slug,
          description: cat.description
        }
      });
      console.log("Created new category:", newCat);
    }
  }
}

fixDB().finally(() => prisma.$disconnect());
