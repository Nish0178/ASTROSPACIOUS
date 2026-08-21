import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: "test", // doesn't matter we just want to see validation error or we can load from env
  api_key: "test",
  api_secret: "test"
});

console.log("Testing cloudinary format validation");
