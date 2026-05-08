// schemas/authSchema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(6, 'Name must be at least 6 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
