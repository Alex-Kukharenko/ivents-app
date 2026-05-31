import { RouterOutput } from '@/shared/api'

type EventDetailProps = NonNullable<RouterOutput['event']['findUnique']>

export const EventDetail = ({ title, description, date, participation }: EventDetailProps) => {
  return (
    <div className="space-y-4 container mx-auto max-w-[750px] flex flex-col gap-[15px]">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-6 text-gray-900 ">Информация о событии</h3>
      </div>

      <div className="mt-4 border-t border-zinc-200">
        <dl className="divide-y divide-zinc-200">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Название</dt>
            <dd className="mt-1 text-sm text-zinc-600 sm:col-span-2 sm:mt-0">{title}</dd>
          </div>

          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Описание</dt>
            <dd className="mt-1 text-sm text-zinc-600 sm:col-span-2 sm:mt-0">{description}</dd>
          </div>

          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Дата проведения</dt>
            <dd className="mt-1 text-sm text-zinc-600 sm:col-span-2 sm:mt-0">
              {date.toDateString()}
            </dd>
          </div>

          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Участники</dt>
            <dd className="mt-1 text-sm text-zinc-600 sm:col-span-2 sm:mt-0">
              {participation.map(({ user }) => user.name).join(', ')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
