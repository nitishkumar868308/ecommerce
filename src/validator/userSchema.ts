import { z } from "zod";

export const userSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    createdAt: z.union([z.string(), z.date()]).optional(),
    updatedAt: z.union([z.string(), z.date()]).optional(),
});

export type User = z.infer<typeof userSchema>;
