import { PrismaClient } from '@prisma/client';
import {
	zahn_events,
	hno_events,
	organisations,
	superusers,
	tickets,
	activities,
	users
} from './data.js';

const prisma = new PrismaClient();

async function main() {
	// Delete everything
	await prisma.role.deleteMany({});
	await prisma.superuser.deleteMany({});
	await prisma.visit.deleteMany({});
	await prisma.user.deleteMany({});
	await prisma.ticket.deleteMany({});
	await prisma.activity.deleteMany({});
	await prisma.booking.deleteMany({});
	await prisma.event.deleteMany({});
	await prisma.organisation.deleteMany({});
	await prisma.visit.deleteMany({});

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

	// Create some users
	const users_with_organisation_id = users.map((u) => ({ ...u, organisation_id: zahn_orga.id }));
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
			role: 'ADMIN',
			superuser_id: superuser.id,
			organisation_id: zahn_orga.id
		}
	});
	await prisma.role.create({
		data: {
			role: 'ADMIN',
			superuser_id: superuser.id,
			organisation_id: hno_orga.id
		}
	});

	// Create some tickets
	const event = await prisma.event.findFirst();
	const tickets_with_event_id = tickets.map((t) => ({ ...t, event_id: event.id }));
	await prisma.ticket.createMany({
		data: tickets_with_event_id
	});

	// Create some activities
	const activities_with_event_id = activities.map((a) => ({ ...a, event_id: event.id }));
	await prisma.activity.createMany({
		data: activities_with_event_id
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
