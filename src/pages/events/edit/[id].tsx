import { EditEventForm } from '@/features/edit-event'
import { trpc } from '@/shared/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function EditEventPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  })

  if (isLoading || status === 'loading') return <p>Загрузка...</p>

  if (status === 'unauthenticated') {
    router.push('/auth')
    return null
  }

  if (!data) return <p>Событие не найдено</p>

  if (data.authorId !== session?.user?.id) {
    return <p>У вас нет доступа к редактированию этого события</p>
  }

  return (
    <EditEventForm
      id={Number(router.query.id)}
      title={data.title}
      description={data.description}
      date={data.date}
    />
  )
}
