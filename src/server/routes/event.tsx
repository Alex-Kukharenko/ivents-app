import { isAuth, publicProcedure, router } from '../trpc'
import { prisma } from '../db'
import { CreateEventSchema, JoinEventSchema, LeaveEventSchema } from '@/shared/schema'
import z from 'zod'

export const eventRouter = router({
  findMany: publicProcedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participation: true,
      },
    })
    return events.map(({ participation, ...events }) => ({
      ...events,
      isJoined: participation.some(({ userId }) => userId === user?.id),
    }))
  }),
  findUnique: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        select: {
          title: true,
          description: true,
          date: true,
          participation: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
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
  join: publicProcedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      })
    }),
  leave: publicProcedure
    .input(LeaveEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.delete({
        where: {
          userId_eventId: {
            userId: user.id,
            eventId: input.id,
          },
        },
      })
    }),
})
