import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided"
      });
    }

    const token = authHeader.split(" ")[1];
    
    try {
  const decoded = verifyToken(token);

  console.log("✅ JWT VERIFIED");
  console.log(decoded);

  req.admin = decoded;
  next();
} catch (error: any) {
  console.error("❌ JWT VERIFY ERROR:");
  console.error(error);

  return res.status(401).json({
    success: false,
    message: error.message
  });
}
  } catch (error) {
    next(error);
  }
};
