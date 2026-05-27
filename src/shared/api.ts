import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'
import { ssrPrepass } from '@trpc/next/ssrPrepass'
import type { AppRouter } from '@/server/routes'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  transformer: superjson,
  config(info) {
    const { ctx } = info

    if (typeof window !== 'undefined') {
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
            transformer: superjson,
          }),
        ],
      }
    }

    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          headers() {
            if (!ctx?.req?.headers) return {}
            return {
              cookie: ctx.req.headers.cookie,
            }
          },
        }),
      ],
    }
  },
})
