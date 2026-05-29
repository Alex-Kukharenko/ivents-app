import { useForm } from 'react-hook-form'
import { CreateEventSchema } from '@/shared/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

export type CreateEventValues = z.infer<typeof CreateEventSchema>

type CreateEventFormeProps = {
  onSubmit: (data: CreateEventValues) => void
}

export const CreateEventForm = ({ onSubmit }: CreateEventFormeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventValues>({
    resolver: zodResolver(CreateEventSchema),
  })

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Событие</h1>
        <p className="mt-1 text-sm text-gray-500">Заполните форму для события.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
            Название
          </label>
          <input
            id="title"
            type="text"
            placeholder="Введите название события"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            {...register('title')}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
            Описание
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Введите описание"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
            {...register('description')}
          />
          <p className="mt-2 text-sm text-gray-500">
            Напишите несколько предложений о предстоящем мероприятии.
          </p>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2">
            Дата проведения
          </label>
          <input
            id="date"
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            {...register('date')}
          />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 h-10 px-6 font-semibold rounded-lg border border-gray-200 text-gray-900 hover:border-gray-400 transition-colors cursor-pointer text-sm"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="flex-1 h-10 px-6 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer text-sm"
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  )
}
