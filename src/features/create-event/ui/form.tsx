import { EventForm } from '@/entities/ui/event-form'
import { trpc } from '@/shared/api'
import { useRouter } from 'next/router'
import type { CreateEventValues } from '@/shared/schema'

export const CreateEventForm = () => {
  const router = useRouter()
  const { mutate, isPending } = trpc.event.create.useMutation({
    onSuccess: (data) => router.push(`/events/${data.id}`),
  })

  return (
    <EventForm
      title="Создать событие"
      description="Заполните форму для события."
      isPending={isPending}
      onSubmit={(data: CreateEventValues) => mutate(data)}
    />
  )
}
