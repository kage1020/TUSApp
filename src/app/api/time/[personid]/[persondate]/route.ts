import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

// export const PUT = async (
//   req: Request,
//   { params }: { params: { personid: string; persondate: string } },
// ) => {
//   const res = await prisma.timeManagement
//     .findUnique({ where: { id: params.personid, Date: params.persondate } })
//     .then(
//       (person) =>
//         person &&
//         prisma.timeManagement.update({
//           where: { TimeManagemet_pkey: { id: params.personid, Date: params.persondate } },
//           data: { ExitTime: new Date().toLocaleTimeString() },
//         }),
//     )
//   return NextResponse.json(res)
// }
export const PUT = async (
  req: Request,
  { params }: { params: { personid: string; persondate: string } },
) => {
  const { personid, persondate } = params

  const res = await prisma.timeManagement
    .findUnique({
      where: { TimeManagement_pkey: { id: personid, Date: persondate } },
    })
    .then((person) => {
      if (person) {
        return prisma.timeManagement.update({
          where: { TimeManagement_pkey: { id: personid, Date: persondate } },
          data: { ExitTime: new Date().toLocaleTimeString() },
        })
      }
      return null
    })

  return NextResponse.json(res)
}

// export const PUT = async (req: Request, { params }: { params: { personid: string } }) => {
//   const res = await prisma.timeManagement.findUnique({ where: { id: params.personid } }).then(
//     (person) =>
//       person &&
//       prisma.timeManagement.update({
//         where: { id: params.personid },
//         data: { ExitTime: new Date().toLocaleTimeString() },
//       }),
//   )
//   return NextResponse.json(res)
// }

// export const DELETE = async (req: Request, { params }: { params: { taskId: string } }) => {
//   const res = await prisma.timeManagement.delete({ where: { id: params.taskId } })
//   return NextResponse.json(res)
// }
