import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

async function fixDb() {
  const prisma = new PrismaClient();
  cloudinary.config(); // Loads injected CLOUDINARY_URL

  const magazine = await prisma.magazine.findUnique({
    where: { slug: "mystery-of-sopdet-volume-01-issue-001" }
  });

  if (!magazine || !magazine.pdfUrl) {
    console.log("No magazine or pdfUrl found");
    return;
  }

  console.log("Old PDF URL:", magazine.pdfUrl);

  // Extract public_id and version from URL
  // Example URL: https://res.cloudinary.com/zbbyzygv/raw/authenticated/s--yiw_qldn--/v1787296421/pdfs/f86994ed6d8299b523ee124b5c8294d1.pdf?_a=BAMCr6WQ0
  const match = magazine.pdfUrl.match(/\/v(\d+)\/(pdfs\/.*?\.pdf)/);
  if (!match) {
    console.log("Could not parse public_id/version");
    return;
  }

  const version = match[1];
  const publicId = match[2];

  // Generate new URL with fl_attachment
  const newUrl = cloudinary.url(publicId, {
    resource_type: "raw",
    type: "authenticated",
    secure: true,
    sign_url: true,
    flags: "attachment",
    version: version
  });

  console.log("New PDF URL:", newUrl);

  await prisma.magazine.update({
    where: { id: magazine.id },
    data: { pdfUrl: newUrl }
  });

  console.log("Database updated successfully!");
  await prisma.$disconnect();
}

fixDb().catch(console.error);
