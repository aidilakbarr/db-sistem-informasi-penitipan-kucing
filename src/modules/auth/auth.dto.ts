import { z } from "zod";
import { loginSchema, registerSchema } from "./auth.schema";

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;

export type CreateUserDTO = Omit<RegisterDTO, "confirmPassword">;
