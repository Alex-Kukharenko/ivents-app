import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/server/db'
import argon2 from 'argon2'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const isValid = await argon2.verify(user.password, credentials.password)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessTokenExpires: Date.now() + 60 * 60 * 1000,
          refreshTokenExpires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        }
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }
      if (Date.now() < (token.refreshTokenExpires as number)) {
        return {
          ...token,
          accessTokenExpires: Date.now() + 60 * 60 * 1000,
        }
      }
      return { ...token, error: 'RefreshTokenExpired' }
    },

    async session({ session, token }) {
      session.user.id = Number(token.sub)
      session.error = token.error as string | undefined
      return session
    },
  },
  pages: {
    signIn: '/auth',
  },
}

export default NextAuth(authOptions)
