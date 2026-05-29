import { publicProcedure, router } from '../trpc'
import { prisma } from '../db'
import { CreateEventSchema } from '@/shared/schema'

export const eventRouter = router({
  findMany: publicProcedure.query(() => {
    return prisma.event.findMany()
  }),
  create: publicProcedure.input(CreateEventSchema).mutation(async ({ input }) => {
    const user = await prisma.user.findFirstOrThrow()
    return prisma.event.create({
      data: {
        authorId: user.id,
        title: input.title,
        description: input.description,
        date: new Date(input.date),
      },
    })
  }),
})
