import { EventCard } from '@/server/entities/ui/card'
import { trpc } from '@/shared/api'

export default function Home() {
  const { data } = trpc.event.findMany.useQuery()
  return (
    <ul className="container  mx-auto max-w-[750px] flex flex-col gap-[15px]">
      {data?.map((event) => (
        <li key={event.id}>
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  )
}

