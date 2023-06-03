import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

//全てサーバー側の処理
export const GET = async () => {
  const Person = await prisma.timeManagement.findMany()
  return NextResponse.json(Person)
}

export const POST = async (req: Request) => {
  //表に送る、Personでjson,resで表に書くものを抽出
  const Person = await req.json()
  const res = await prisma.timeManagement.create({
    data: {
      id: Person.id,
      Name: Person.Name,
      Date: Person.Date,
      EnterTime: Person.EnterTime,
      ExitTime: Person.ExitTime,
    },
  })
  return NextResponse.json(res)
}
