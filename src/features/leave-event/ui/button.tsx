import { trpc } from '@/shared/api'

type LeaveEventButtonProps = {
  eventId: number
  onSuccess?: () => void
}

export const LeaveEventButton = ({ eventId, onSuccess }: LeaveEventButtonProps) => {
  const { mutate, isPending } = trpc.event.leave.useMutation({ onSuccess })

  return (
    <button
      onClick={() => mutate({ id: eventId })}
      disabled={isPending}
      className="h-10 px-6 font-semibold rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
    >
      {isPending ? 'Выход...' : 'Покинуть'}
    </button>
  )
}
