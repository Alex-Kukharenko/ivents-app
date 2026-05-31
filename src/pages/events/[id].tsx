import { EventDetail } from '@/entities/ui/detail'
import { trpc } from '@/shared/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Event() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  })

  if (isLoading) return <p>Загрузка...</p>

  if (status === 'unauthenticated') return <p>Вы должны быть авторизованы</p>

  if (!data) return <p>Событие не найдено</p>

  const isAuthor = data.authorId === session?.user?.id

  return (
    <div>
      {isAuthor && (
        <div className="flex justify-end mb-4">
          <Link
            href={`/events/edit/${router.query.id}`}
            className="h-10 px-6 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm flex items-center"
          >
            Редактировать
          </Link>
        </div>
      )}
      <EventDetail {...data} />
    </div>
  )
}
