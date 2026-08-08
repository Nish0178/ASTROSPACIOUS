import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@astrospacious.com';
  
  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`Admin with email ${email} already exists. Skipping seed.`);
    return;
  }

  // Create new admin
  const password = 'Admin@123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      name: 'Astrospacious Admin',
      email: email,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log(`Successfully created admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
