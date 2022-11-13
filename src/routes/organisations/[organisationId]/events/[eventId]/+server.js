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
			eventTickets: {
				select: {
					id: true,
					name: true,
					price: true,
					availableFrom: true,
					availableTo: true,
					dayTicketDate: true,
					visitorCategoryId: true,
					visitorCategory: {
						select: {
							id: true,
							name: true
						}
					}
				}
			},
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
			activities: {
				select: {
					id: true,
					name: true,
					description: true,
					speaker: true,
					limit: true,
					location: true,
					date: true,
					start: true,
					end: true,
					type:true,
					activityTickets: {
						select: {
							id: true,
							name: true,
							price: true,
							visitorCategoryId: true,
							visitorCategory: {
								select: {
									id: true,
									name: true
								}
							}
						}
					}
				}
			},
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
			},
			visitorCategories: {
				select: {
					id: true,
					name: true,
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


	const event = await locals.prisma.event.update({
		where: {
			id: params.eventId
		},
		data: {
			name: data.name,
			description: data.description,
			location: data.location,
			city: data.city,
			start: new Date(data.start),
			end: new Date(data.end)
		}
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
