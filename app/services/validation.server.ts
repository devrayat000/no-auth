import { z } from "zod";

const basicSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const loginSchema = basicSchema.extend({
  rememberMe: z.enum(["on", "off"]).default("off"),
});

export const formSchema = z
  .instanceof(FormData)
  .transform((formData) => Object.fromEntries(formData.entries()));

export const registerSchema = basicSchema.extend({
  username: z.string().min(6),
  termsConditions: z.enum(["on"]),
});

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

type ValidationError<T> = Partial<
  z.typeToFlattenedError<T> & { values?: Partial<T> }
>;

export type LoginValidationError = ValidationError<LoginSchema>;
export type RegisterValidationError = ValidationError<RegisterSchema>;

export function validateLogin(formData: FormData) {
  const params = formSchema.parse(formData);
  const data = loginSchema.safeParse(params);
  if (!data.success) {
    return Object.assign(data.error.flatten(), {
      values: params,
      success: false as const,
    });
  }
  return data;
}

export function validateRegister(formData: FormData) {
  const params = formSchema.parse(formData);
  const data = registerSchema.safeParse(params);
  if (!data.success) {
    return Object.assign(data.error.flatten(), {
      values: params,
      success: false as const,
    });
  }
  return data;
}
