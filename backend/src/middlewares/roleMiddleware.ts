import { Request, Response, NextFunction } from "express";

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Admin not authenticated"
        });
      }

      if (!allowedRoles.includes(req.admin.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - Insufficient permissions"
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
