// prisma/seed.ts
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Создаём пользователя
  const user = await prisma.user.create({
    data: {
      name: 'Иван Петров',
      email: 'ivan@example.com',
      password: '123456',
    },
  })

  // Создаём 5 событий
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Рок концерт',
        description: 'Большой рок концерт в центре города',
        date: new Date('2025-06-20'),
        authorId: user.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Выставка картин',
        description: 'Современное искусство от молодых художников',
        date: new Date('2025-07-05'),
        authorId: user.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Марафон',
        description: 'Городской марафон 10км',
        date: new Date('2025-07-15'),
        authorId: user.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Джазовый вечер',
        description: 'Живая джазовая музыка в уютном баре',
        date: new Date('2025-08-01'),
        authorId: user.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Кинофестиваль',
        description: 'Показ независимых фильмов со всего мира',
        date: new Date('2025-08-20'),
        authorId: user.id,
      },
    }),
  ])

  console.log('Создан пользователь:', user)
  console.log('Создано событий:', events.length)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
