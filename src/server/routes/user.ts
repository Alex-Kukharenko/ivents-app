// src/server/routes/user.ts
import { publicProcedure, router } from '../trpc'
import { prisma } from '../db'
import { RegisterSchema } from '@/shared/schema'
import argon2 from 'argon2'

export const userRouter = router({
  register: publicProcedure.input(RegisterSchema).mutation(async ({ input }) => {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    })

    if (existing) {
      throw new Error('Пользователь с таким email уже существует')
    }
    const hashedPassword = await argon2.hash(input.password)

    return prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    })
  }),
})
