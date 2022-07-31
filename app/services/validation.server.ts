import { z } from "zod";

const basicSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const loginSchema = basicSchema.extend({
  rememberMe: z.enum(["on", "off"]).default("off"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(6),
  termsConditions: z.boolean().refine((val) => val),
});

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

type ValidationError<T> = Partial<
  z.typeToFlattenedError<T> & { values?: Partial<T> }
>;

export type LoginValidationError = ValidationError<LoginSchema>;
export type RegisterValidationError = ValidationError<RegisterSchema>;

export function validateLogin(params: any) {
  const data = loginSchema.safeParse(params);
  if (!data.success) {
    return Object.assign(data.error.flatten(), {
      values: params,
      success: false as const,
    });
  }
  return data;
}
