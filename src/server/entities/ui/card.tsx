import Image from 'next/image'
import Link from 'next/link'

type EventCardProps = {
  id: number
  title: string
  description: string | null
  date: Date
}

export const EventCard = ({ id, title, date, description, data }: EventCardProps) => {
  return (
    <div>
      <div className="flex bg-white rounded-xl shadow-md overflow-hidden p-2">
        <div className="flex-none w-48 relative">
          <Image
            src="/classic-utility-jacket.jpg"
            alt="Classic Utility Jacket"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-auto p-6  ">
          <div className="flex flex-wrap gap-2">
            <h1 className="flex-auto text-xl font-semibold text-gray-900">{title}</h1>
            <div className="text-xl font-semibold text-gray-500">{date.toDateString()}</div>
            <div className="w-full text-sm font-medium text-gray-400 mt-1">{description}</div>
          </div>
          <div className="flex gap-3 mb-6 text-sm font-medium">
            <div className="flex-auto flex gap-3">
              <button
                className="h-10 px-6 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                type="submit"
              >
                Присоединится
              </button>
              <Link
                href={`/events/${id}`}
                className="h-10 px-6 font-semibold rounded-lg border border-slate-900 text-slate-900 align-middle leading-6"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
