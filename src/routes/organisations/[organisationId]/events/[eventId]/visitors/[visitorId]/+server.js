import { toVisitorJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visitor = await locals.prisma.visitor.findFirst({
		where: {
			id: params.visitorId,
			eventId: params.eventId
		},
		include: {
			ticket: true,
			activities: true
		}
	});
	return new Response(toVisitorJSON(visitor));
}

export async function PUT({ locals, params, request }) {
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

	// Update visitor
	const visitor = await locals.prisma.visitor.update({
		where: {
			id: params.visitorId
		},
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			eventTicketId: data.eventTicketId,
			categoryId: data.categoryId,
			type: category.type,
			status: data.status,
			price: data.price,
			eventTicketPrice: eventTicket.price,
			activityTicketsPrices: activityTickets.map((a) => a.price),
			activities: {
				set: [],
				connect: activityTickets.map((a) => ({ id: a.activityId }))
			},
			activityTickets: {
				set: [],
				connect: activityTickets.map((a) => ({ id: a.id }))
			}
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
					name: true
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
			}
		}
	});

	return new Response(toVisitorJSON(visitor), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedVisitor = await locals.prisma.visitor.delete({
		where: {
			id: params.visitorId
		}
	});

	return new Response(JSON.stringify(toVisitorJSON(deletedVisitor)), { status: 200 });
}
