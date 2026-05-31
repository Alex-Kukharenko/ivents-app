import { EventDetail } from '@/entities/ui/detail'
import { trpc } from '@/shared/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Event() {
  const router = useRouter()
  const session = useSession()
  const { data, isLoading } = trpc.event.findUnique.useQuery({ id: Number(router.query.id) })

  if (isLoading) {
    return 'Loading'
  }

  if (session.status === 'unauthenticated') {
    return 'Вы должны быть авторизованы'
  }

  if (!data) {
    return 'no data'
  }

  return <EventDetail {...data} />
}
