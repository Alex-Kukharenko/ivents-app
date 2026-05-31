import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEventSchema } from '@/shared/schema'
import type { z } from 'zod'

type EventFormValues = z.infer<typeof CreateEventSchema>

type EventFormProps = {
  title: string
  description?: string
  defaultValues?: Partial<EventFormValues>
  isPending?: boolean
  onSubmit: (data: EventFormValues) => void
}

export const EventForm = ({
  title,
  description,
  defaultValues,
  isPending,
  onSubmit,
}: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues,
  })

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
            Название
          </label>
          <input
            id="title"
            type="text"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition
              ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            {...register('title')}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 font-medium">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
            Описание
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition resize-none"
            {...register('description')}
          />
          <p className="mt-2 text-sm text-gray-500">
            Напишите несколько предложений о предстоящем мероприятии.
          </p>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2">
            Дата проведения
          </label>
          <input
            id="date"
            type="date"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition
              ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            {...register('date')}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 font-medium">{errors.date.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 h-10 px-6 font-semibold rounded-lg border border-gray-200 text-gray-900 hover:border-gray-400 transition-colors cursor-pointer text-sm"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 h-10 px-6 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  )
}
