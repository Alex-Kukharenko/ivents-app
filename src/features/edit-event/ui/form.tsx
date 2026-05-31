import { EventForm } from '@/entities/ui/event-form'
import { trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import type { CreateEventValues } from '@/shared/schema'

type EditEventFormProps = {
  id: number
  title: string
  description?: string | null
  date: Date
}

export const EditEventForm = ({ id, title, description, date }: EditEventFormProps) => {
  const router = useRouter()
  const { mutate, isPending } = trpc.event.update.useMutation({
    onSuccess: (data) => router.push(`/events/${data.id}`),
  })

  return (
    <EventForm
      title="Редактировать событие"
      description="Измените данные события."
      isPending={isPending}
      defaultValues={{
        title,
        description: description ?? '',
        date: date.toISOString().split('T')[0],
      }}
      onSubmit={(data: CreateEventValues) => mutate({ id, ...data })}
    />
  )
}
