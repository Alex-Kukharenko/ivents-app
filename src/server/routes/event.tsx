import { publicProcedure, router } from '../trpc'
import { prisma } from '../db'

export const eventRouter = router({
  findMany: publicProcedure.query(() => {
    return prisma.event.findMany()
  }),
})
