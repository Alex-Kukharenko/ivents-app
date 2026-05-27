import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-libsql', '@libsql/client'],
  turbopack: {
    resolveAlias: {
      '@prisma/client/runtime/client': '@prisma/client/runtime/client',
    },
  },
}

export default nextConfig
