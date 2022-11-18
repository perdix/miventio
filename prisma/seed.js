import { PrismaClient } from '@prisma/client';
import {
	zahn_events,
	hno_events,
	organisations,
	users,
	eventTickets,
	activities,
	memberships,
	contacts,
	visitorCategories
} from './data.js';

const prisma = new PrismaClient();

async function main() {
	// Delete everything
	await prisma.role.deleteMany({});
	await prisma.user.deleteMany({});
	await prisma.visitor.deleteMany({});
	await prisma.membership.deleteMany({});
	await prisma.contact.deleteMany({});
	await prisma.eventTicket.deleteMany({});
	await prisma.activity.deleteMany({});
	await prisma.booking.deleteMany({});
	await prisma.visitorCategory.deleteMany({});
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

	// Create memberships
	const membershipsWithOrganisationId = memberships.map((m) => ({
		...m,
		organisationId: zahn_orga.id
	}));
	await prisma.membership.createMany({
		data: membershipsWithOrganisationId
	});

	// Create some contacts
	const contactsWithOrganisationId = contacts.map((c) => ({ ...c, organisationId: zahn_orga.id }));
	await prisma.contact.createMany({
		data: contactsWithOrganisationId
	});

	// Get first contact
	const firstContact = await prisma.contact.findFirst({
		where: {
			email: 'max1@hallo.io'
		}
	});

	// Get first membership
	const firstMembership = await prisma.membership.findFirst({
		where: {
			name: 'Hauptmitglied'
		}
	});

	// Add membership to first contact
	const updatedContact = await prisma.contact.update({
		where: {
			id: firstContact.id
		},
		data: {
			membership: {
				connect: { id: firstMembership.id }
			}
		}
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

	// Create some visitorCategories
	const visCatWithEventId = visitorCategories.map((a) => ({ ...a, eventId: event.id }));
	await prisma.visitorCategory.createMany({
		data: visCatWithEventId
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
