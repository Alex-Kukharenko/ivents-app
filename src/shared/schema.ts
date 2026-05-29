import z from 'zod'

export const CreateEventSchema = z.object({
  title: z.string().min(5, 'Минимум 5 символов'),
  description: z.string().optional(),
  date: z.string(),
})
