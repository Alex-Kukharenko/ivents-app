import { trpc } from '@/shared/api'

type JoinEventButtonProps = {
  eventId: number
  onSuccess?: () => void
}

export const JoinEventButton = ({ eventId, onSuccess }: JoinEventButtonProps) => {
  const { mutate } = trpc.event.join.useMutation({ onSuccess })

  const handleClick = () => {
    mutate({ id: eventId })
  }

  return (
    <button
      onClick={handleClick}
      className="h-10 px-6 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer"
      type="submit"
    >
      Присоединится
    </button>
  )
}
