import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { trpc } from '@/shared/api'
import type { Session } from 'next-auth'
import '@/styles/globals.css'
import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Layout } from '@/widgets/layout'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshTokenExpired') {
      signOut()
    }
  }, [session])

  return <>{children}</>
}

type AppPropsWithSession = AppProps & {
  pageProps: {
    session?: Session
  }
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithSession) => {
  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)

