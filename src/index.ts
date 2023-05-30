import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
