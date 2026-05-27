// src/pages/api/trpc/[trpc].ts
import { appRouter } from '@/server/routes'
import { createNextApiHandler } from '@trpc/server/adapters/next'

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
