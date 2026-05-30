import { trpc } from '@/shared/api'

type JoinEventButtonProps = {
  eventId: number
}

export const JoinEventButton = ({ eventId }: JoinEventButtonProps) => {
  const { mutate } = trpc.event.join.useMutation()

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
