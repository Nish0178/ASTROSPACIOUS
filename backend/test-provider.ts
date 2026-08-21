import { CloudinaryStorageProvider } from "./src/services/storage/CloudinaryStorageProvider";

async function run() {
  const provider = new CloudinaryStorageProvider();
  
  const dummyPdf = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000052 00000 n \n0000000109 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n198\n%%EOF');
  
  try {
    const result = await provider.uploadFile({
      buffer: dummyPdf,
      originalName: "test.pdf",
      mimeType: "application/pdf",
      size: dummyPdf.length
    }, "pdfs");
    
    console.log("Upload Result:", result);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
