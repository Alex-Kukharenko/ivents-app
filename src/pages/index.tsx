import { useSession } from 'next-auth/react'
import { EventCard } from '@/entities/ui/card'
import { trpc } from '@/shared/api'
import { JoinEventButton } from '@/features/join-event'

export default function Home() {
  const { data: session } = useSession()
  const { data, refetch } = trpc.event.findMany.useQuery()

  return (
    <>
      <div>{session?.user?.name}</div>
      <ul className="container mx-auto max-w-[750px] flex flex-col gap-[15px]">
        {data?.map((event) => (
          <li key={event.id}>
            <EventCard
              {...event}
              action={!event.isJoined && <JoinEventButton eventId={event.id} onSuccess={refetch} />}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

