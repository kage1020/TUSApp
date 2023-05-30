import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export const PUT = async (req: Request, { params }: { params: { taskId: string } }) => {
  const res = await prisma.task.findUnique({ where: { id: params.taskId } }).then(
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
  const res = await prisma.task.delete({ where: { id: params.taskId } })
  return NextResponse.json(res)
}
