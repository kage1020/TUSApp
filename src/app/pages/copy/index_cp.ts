import { PrismaClient } from '@prisma/client'

// interface Person {
//   people: {
//     id: number
//     Name: string
//     Date: string
//     intime: string
//     outtime: string
//     Present: string
//   }
// }

const prisma = new PrismaClient()

// const send_table = (props: Person) => {
//   async function main() {
//     await prisma.attend.create({
//       data: props.people,
//     })

//     const allUsers = await prisma.attend.findMany()
//     console.log(allUsers)
//   }

//   main()
//     .then(async () => {
//       await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//       console.error(e)
//       await prisma.$disconnect()
//       process.exit(1)
//     })
// }

// export default send_table

async function main() {
  await prisma.attend.create({
    data: {
      id: 462237,
      Name: 'Al',
      Date: new Date().toLocaleDateString(),
      EnterTime: new Date().toLocaleTimeString(),
      ExitTime: new Date().toLocaleTimeString(),
    },
  })

  const allUsers = await prisma.attend.findMany()
  console.log(allUsers)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
