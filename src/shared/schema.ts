import z from 'zod'

export const CreateEventSchema = z.object({
  title: z.string().min(5, 'Минимум 5 символов'),
  description: z.string().optional(),
  date: z.string(),
})

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
})

export const LeaveEventSchema = z.object({
  id: z.number().int().positive(),
})

// Auth schemas
export const SignInSchema = z.object({
  email: z.string().check(z.email({ error: 'Некорректный email' })),
  password: z.string().min(6, 'Минимум 6 символов'),
})

export const RegisterSchema = z.object({
  name: z.string().min(4, 'Минимум 4 символа'),
  email: z.string().check(z.email({ error: 'Некорректный email' })),
  password: z.string().min(6, 'Минимум 6 символов'),
})

export type SignInValues = z.infer<typeof SignInSchema>
export type RegisterValues = z.infer<typeof RegisterSchema>
