import { CreateEventForm, EventFormValues } from '@/features'
import { trpc } from '@/shared/api'

export default function CreateEvent() {
  const { mutate } = trpc.event.create.useMutation()
  const handleSubmit = (data: EventFormValues) => {
    mutate(data)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <CreateEventForm onSubmit={handleSubmit} />
    </div>
  )
}
