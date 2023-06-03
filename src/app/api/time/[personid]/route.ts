import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export const PUT = async (req: Request, { params }: { params: { personid: string } }) => {
  const res = await prisma.timeManagement.findUnique({ where: { id: params.personid } }).then(
    (person) =>
      person &&
      prisma.timeManagement.update({
        where: { id: params.personid },
        data: { ExitTime: new Date().toLocaleTimeString() },
      }),
  )
  return NextResponse.json(res)
}

export const DELETE = async (req: Request, { params }: { params: { taskId: string } }) => {
  const res = await prisma.timeManagement.delete({ where: { id: params.taskId } })
  return NextResponse.json(res)
}
