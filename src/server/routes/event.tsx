import { isAuth, publicProcedure, router } from '../trpc'
import { prisma } from '../db'
import { CreateEventSchema } from '@/shared/schema'

export const eventRouter = router({
  findMany: publicProcedure.query(() => {
    return prisma.event.findMany()
  }),
  create: publicProcedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx: { user } }) => {
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
