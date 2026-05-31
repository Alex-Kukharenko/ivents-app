# Events

A platform for managing and joining events.

## Tech Stack

- **Next.js 16** (Pages Router)
- **tRPC** — end-to-end typesafe API
- **Prisma 7** + **SQLite** (libsql adapter)
- **NextAuth.js** — authentication with JWT
- **React Hook Form** + **Zod** — forms and validation
- **Tailwind CSS** — styling
- **Argon2** — password hashing

## Features

- User registration and login
- Browse events list
- Create / edit events (authenticated users only, edit for authors only)
- Join / leave events
- View event participants

## Getting Started

```bash
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

Create a `.env` file:

```bash
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000)
EOF