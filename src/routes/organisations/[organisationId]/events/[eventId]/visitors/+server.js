import { toVisitorsJSON, toVisitorJSON } from '$lib/server/serialization';
import { isOrganisationMember, isOrganisationAdmin } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visitors = await locals.prisma.visitor.findMany({
		where: {
			organisation_id: params.organisationId,
			eventId: params.visitId
		},
		include: {
			user: true
		}
	});
	return new Response(toVisitorsJSON(visitors));
}


export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	console.log(data);

	// Get category
	const category = await locals.prisma.visitorCategory.findFirst({
		where: {
			id: data.categoryId
		}
	});
	// Get eventTicket
	const eventTicket = await locals.prisma.eventTicket.findFirst({
		where: {
			id: data.eventTicketId
		}
	});
	// Get activityTickets
	const activityTickets = await locals.prisma.activityTicket.findMany({
		where: {
			id: { in: data.activityTicketsIds }
		}
	});

	// Create visitor
	const visitor = await locals.prisma.visitor.create({
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			eventTicketId: data.eventTicketId,
			eventId: params.eventId,
			categoryId: data.categoryId,
			type: category.type,
			status: data.status,
			price: data.price,
			eventTicketPrice: eventTicket.price,
			activityTicketsPrices: activityTickets.map(a => a.price),
			activityTickets: {
				connect: activityTickets.map(a => ({ id: a.id}))
			},
			// contact: {
			// 	connectOrCreate: {
			// 		where: {
			// 			firstName_lastName_email: {
			// 				firstName: data.firstName,
			// 				lastName: data.lastName,
			// 				email: data.email
			// 			}
			// 		},
			// 		create: {
			// 			firstName: data.firstName,
			// 			lastName: data.lastName,
			// 			email: data.email,
			// 			type: category.type,
			// 			organisation: {
			// 				connect: {
			// 					id: params.organisationId
			// 				}
			// 			}
			// 		}
			// 	},
			// },
		}
	});

	// Create connected contact
	const contact = await locals.prisma.contact.upsert({
		where: {
			firstName_lastName_email: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email
			}
		},
		update: {
			type: category.type,
		},
		create: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			type: category.type,
			organisation: {
				connect: {
					id: params.organisationId
				}
			}
		},
	});

	console.log(visitor);

	return new Response(toVisitorJSON(visitor), { status: 201 });
}
