import { z } from "zod";
import { RoleSchema } from "./enums.js";

export const UserSchema = z.object({
  id: z.string(),
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  role: RoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export const updateUserRoleSchema = z.object({
  role: RoleSchema,
});
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
