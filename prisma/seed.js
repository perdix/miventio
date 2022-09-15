import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  // Add 3 Organisations
  const org1 = await prisma.organisation.upsert({
    where: { name: 'Gesellschaft für Parodontologie 1' },
    update: {},
    create: {
      name: 'Gesellschaft für Parodontologie 1',
    },
  })
  const org2 = await prisma.organisation.upsert({
    where: { name: 'Gesellschaft für Parodontologie 2' },
    update: {},
    create: {
      name: 'Gesellschaft für Parodontologie 2',
    },
  })
  const org3 = await prisma.organisation.upsert({
    where: { name: 'Gesellschaft für Parodontologie 3' },
    update: {},
    create: {
      name: 'Gesellschaft für Parodontologie 3',
    },
  })

  // Add user
  const user1 = await prisma.user.upsert({
    where: { email: 'paul.opitz@outlook.com' },
    update: {},
    create: {
      first_name: 'Paul',
      last_name: 'Opitz',
      email: 'paul.opitz@outlook.com',
    }
  })

    // Add admin role
  const role1 = await prisma.role.upsert({
      where: { 
        user_id_organisation_id: {user_id: user1.id, organisation_id: org1.id}
      },
      update: {},
      create: {
        role: "ADMIN",
        user_id: user1.id,
        organisation_id: org1.id
      }
  })
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