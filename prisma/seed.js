import { PrismaClient } from '@prisma/client';
import {
	zahn_events,
	hno_events,
	organisations,
	users,
	eventTickets,
	activities,
	contacts
} from './data.js';

const prisma = new PrismaClient();

async function main() {
	// Delete everything
	await prisma.role.deleteMany({});
	await prisma.user.deleteMany({});
	await prisma.visitor.deleteMany({});
	await prisma.contact.deleteMany({});
	await prisma.eventTicket.deleteMany({});
	await prisma.activity.deleteMany({});
	await prisma.booking.deleteMany({});
	await prisma.event.deleteMany({});
	await prisma.organisation.deleteMany({});

	//  Create organisations
	await prisma.organisation.createMany({
		data: organisations
	});

	// Add some events
	const zahn_orga = await prisma.organisation.update({
		where: {
			name: 'Gesellschaft für Parodontologie'
		},
		data: {
			events: {
				create: zahn_events
			}
		}
	});
	const hno_orga = await prisma.organisation.update({
		where: {
			name: 'Gesellschaft für HNO-Medizin'
		},
		data: {
			events: {
				create: hno_events
			}
		}
	});

	// Create some contacts
	const contactsWithOrganisationId = contacts.map((u) => ({ ...u, organisationId: zahn_orga.id }));
	await prisma.contact.createMany({
		data: contactsWithOrganisationId
	});

	// Create some user with role
	await prisma.user.createMany({
		data: users
	});

	const user = await prisma.user.findFirst();
	await prisma.role.create({
		data: {
			role: 'ADMIN',
			userId: user.id,
			organisationId: zahn_orga.id
		}
	});
	await prisma.role.create({
		data: {
			role: 'ADMIN',
			userId: user.id,
			organisationId: hno_orga.id
		}
	});

	// Create some eventTickets
	const event = await prisma.event.findFirst();
	const eventTicketsWithEventId = eventTickets.map((t) => ({ ...t, eventId: event.id }));
	await prisma.eventTicket.createMany({
		data: eventTicketsWithEventId
	});

	// Create some activities
	const activitiesWithEventId = activities.map((a) => ({ ...a, eventId: event.id }));
	await prisma.activity.createMany({
		data: activitiesWithEventId
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
