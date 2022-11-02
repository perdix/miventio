import { toEventJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const event = await locals.prisma.event.findFirst({
		where: {
			id: params.eventId,
			organisationId: params.organisationId
		},
		include: {
			eventTickets: true,
			bookings: {
				include: {
					visitors: {
						select: {
							id: true,
							status: true,
							eventTicket: true,
							eventTicketId: true,
							eventTicketPrice: true,
							activitiesTicketsPrices: true,
							price: true,
							activities: true,
							contact: {
								select: {
									id: true,
									firstName: true,
									lastName: true,
									email: true
								}
							}
						}
					}
				}
			},
			activities: true,
			visitors: {
				select: {
					id: true,
					status: true,
					eventTicketId: true,
					eventTicket: true,
					eventTicketPrice: true,
					price: true,
					activities: true,
					activitiesTicketsPrices: true,
					contact: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							email: true
						}
					}
				}
			}
		}
	});

	return new Response(toEventJSON(event));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	// Prepare data
	const data = await request.json();
	delete data.tickets;
	delete data.bookings;
	delete data.activities;
	data.start = new Date(data.start);
	data.end = new Date(data.end);

	const event = await locals.prisma.event.update({
		where: {
			id: params.eventId
		},
		data: data
	});

	return new Response(toEventJSON(event), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedEvent = await locals.prisma.event.delete({
		where: {
			id: params.eventId
		}
	});

	return new Response(JSON.stringify({ message: 'Event successfully deleted!' }), { status: 200 });
}
