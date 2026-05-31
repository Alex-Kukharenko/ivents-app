// src/widgets/header/ui/header.tsx
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto max-w-[750px] h-14 flex items-center justify-between px-4">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Result School" width={24} height={24} />
          <span className="font-semibold text-gray-900">Result School</span>
        </Link>

        {/* Навигация */}
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/auth' })}
              className="text-sm text-gray-900 hover:underline"
            >
              Выйти →
            </button>
          </div>
        ) : (
          <Link href="/auth" className="text-sm text-gray-900 hover:underline">
            Войти →
          </Link>
        )}
      </div>
    </header>
  )
}
