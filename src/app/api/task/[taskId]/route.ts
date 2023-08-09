import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import prisma from '@/libs/prisma'

import { authOptions } from '../../auth/[...nextauth]/route'

export const POST = async (req: Request, { params }: { params: { taskId: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session)
    return NextResponse.json([], {
      status: 401,
      statusText: 'You are not authorized. Please sign in.',
    })

  const res = await prisma.task
    .findUnique({ where: { userId_id: { id: params.taskId, userId: session.user.id } } })
    .then(
      (task) =>
        task &&
        prisma.task.update({
          where: { id: params.taskId },
          data: { completed: !task.completed },
        }),
    )
  return NextResponse.json(res)
}

export const DELETE = async (req: Request, { params }: { params: { taskId: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session)
    return NextResponse.json([], {
      status: 401,
      statusText: 'You are not authorized. Please sign in.',
    })

  const res = await prisma.task.delete({
    where: { userId_id: { id: params.taskId, userId: session.user.id } },
  })
  return NextResponse.json(res)
}
