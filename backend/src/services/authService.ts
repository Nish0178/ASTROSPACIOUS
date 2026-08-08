import bcrypt from "bcrypt";
import { prisma } from "./db";
import { generateToken } from "../utils/jwt";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

export const authService = {
  async login(input: LoginInput) {
    // Note: If no admin exists in db yet, this will simply return invalid credentials.
    // In production, admins are seeded or created directly in DB.
    const admin = await prisma.admin.findUnique({
      where: { email: input.email.toLowerCase() }
    });

    if (!admin) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(input.password, admin.password);
    
    if (!isValidPassword) {
      return null;
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    return {
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    };
  }
};
