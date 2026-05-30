import type { User as DbUser } from '@/generated/prisma/client'

declare module 'next-auth' {
  interface User {
    id: number
    name: string
    email: string
  }

  interface Session {
    user: DbUser
    error?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires?: number
    refreshTokenExpires?: number
    error?: string
  }
}
