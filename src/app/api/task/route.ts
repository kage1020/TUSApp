import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import prisma from '@/libs/prisma'

import { authOptions } from '../auth/[...nextauth]/route'

export const GET = async () => {
  const session = await getServerSession(authOptions)

  if (!session)
    return NextResponse.json([], {
      status: 401,
      statusText: 'You are not authorized. Please sign in.',
    })

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { id: 'asc' },
  })
  return NextResponse.json(tasks)
}

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions)

  if (!session)
    return NextResponse.json([], {
      status: 401,
      statusText: 'You are not authorized. Please sign in.',
    })

  const body = await req.json()
  const res = await prisma.task.create({
    data: {
      text: body.text,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  })
  return NextResponse.json(res)
}
