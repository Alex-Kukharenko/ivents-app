import { Header } from '@/widgets/header'
import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-[750px] py-8 px-4">{children}</main>
    </div>
  )
}
