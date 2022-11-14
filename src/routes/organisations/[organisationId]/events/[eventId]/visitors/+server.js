import { toVisitorsJSON, toVisitorJSON } from '$lib/server/serialization';
import { isOrganisationMember, isOrganisationAdmin } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visitors = await locals.prisma.visitor.findMany({
		where: {
			eventId: params.eventId
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			status: true,
			eventTicketId: true,
			eventTicket: true,
			eventTicketPrice: true,
			price: true,
			activities: true,
			activityTicketsPrices: true,
			categoryId: true,
			category: {
				select: {
					id: true,
					name: true,
				}
			},
			activityTickets: {
				select: {
					id: true
				}
			},
			booking: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
					address: true,
					postcode: true,
					city: true,
					phone: true,
					status: true,
					visitors: {
						select: {
							id: true,
							firstName: true,
							lastName: true
						}
					}
				}
			},
		}
	});
	return new Response(toVisitorsJSON(visitors));
}


export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();

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
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			status: true,
			eventTicketId: true,
			eventTicket: true,
			eventTicketPrice: true,
			price: true,
			activities: true,
			activityTicketsPrices: true,
			categoryId: true,
			category: {
				select: {
					id: true,
					name: true,
				}
			},
			activityTickets: {
				select: {
					id: true
				}
			}
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

	return new Response(toVisitorJSON(visitor), { status: 201 });
}
