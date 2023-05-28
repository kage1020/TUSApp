import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export const GET = async () => {
  const tasks = await prisma.task.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(tasks)
}

export const POST = async (req: Request) => {
  const body = await req.json()
  const res = await prisma.task.create({ data: { text: body.text } })
  return NextResponse.json(res)
}
