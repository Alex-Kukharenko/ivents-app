import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db'
import { User } from '@/generated/prisma/client'

type Data = User[]
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const user = await prisma.user.findMany()

  res.status(200).json(user)
}

