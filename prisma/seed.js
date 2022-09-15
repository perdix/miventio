import { PrismaClient } from '@prisma/client'
import { events, organisations, users, superusers, tickets, activities, bookings } from './data.js'

const prisma = new PrismaClient()

async function main() {

  // Delete everything
  await prisma.role.deleteMany({})
  await prisma.superuser.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.ticket.deleteMany({})
  await prisma.activity.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.organisation.deleteMany({})
  

  //  Create organisations
  await prisma.organisation.createMany({
    data: organisations
  });

  // Add some events
  const organisation = await prisma.organisation.update({
    where: {
      name: 'Gesellschaft für Parodontologie 1',
    },
    data: {
      events: {
        create: events
      }
    }
  })

  // Create some users
  const users_with_organisation_id = users.map(u => ({ ...u, organisation_id: organisation.id }))
  await prisma.user.createMany({
    data: users_with_organisation_id
  });


  // Create some superusers with role
  await prisma.superuser.createMany({
    data: superusers
  });

  const superuser = await prisma.superuser.findFirst();
  await prisma.role.create({
    data: { 
      role: "ADMIN",
      superuser_id: superuser.id,
      organisation_id: organisation.id
    }
  });

  // Create some tickets
  const event = await prisma.event.findFirst();
  const tickets_with_event_id = tickets.map(t => ({ ...t, event_id: event.id }))
  await prisma.ticket.createMany({
    data: tickets_with_event_id
  });


  // Create some bookings
  const bookings_with_event_id = bookings.map(b => ({ ...b, event_id: event.id }))
  await prisma.booking.createMany({
    data: bookings_with_event_id
  });

    // Create some activities
    const activities_with_event_id = activities.map(a => ({ ...a, event_id: event.id }))
    await prisma.activity.createMany({
      data: activities_with_event_id
    });


  // // Add admin role
  // const role1 = await prisma.role.upsert({
  //     where: { 
  //       user_id_organisation_id: {user_id: user1.id, organisation_id: org1.id}
  //     },
  //     update: {},
  //     create: {
  //       role: "ADMIN",
  //       user_id: user1.id,
  //       organisation_id: org1.id
  //     }
  // })

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