import { toBookingJSON, toBookingsJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const bookings = await locals.prisma.booking.findMany({
		where: {
			organisationId: params.organisationId,
			eventId: params.bookingId
		}
	});
	return new Response(toBookingsJSON(bookings));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();

	// Create visits prisma query
	let createVisitors = [];
	let price = 0;
	for (const visitor of data.visitors) {
		// Get ticket
		const ticket = await locals.prisma.eventTicket.findUnique({
			where: {
				id: visitor.ticketId
			}
		});
		// Get activities
		const activities = await locals.prisma.activity.findMany({
			where: {
				id: { in: visitor.activitiesIds }
			}
		});

		// Calculate prices and statuses
		const visitorPrice = ticket.price + activities.map((a) => a.price).reduce((a, b) => a + b, 0);
		price += visitorPrice;
		let visitorStatus = 'ANGEMELDET';
		if (data.status == 'BEZAHLT') {
			visitorStatus = 'BEZAHLT';
		}
		const newVisitor = {
			status: visitorStatus,
			activities: {
				connect: activities.map((a) => ({ id: a.id }))
			},
			activitiesPrices: activities.map((a) => ({ id: a.id, price: a.price })),
			ticket: {
				connect: {
					id: ticket.id
				}
			},
			ticketPrice: ticket.price,
			price: visitorPrice,
			event: {
				connect: {
					id: params.eventId
				}
			},
			user: {
				connectOrCreate: {
					where: {
						firstName_lastName_email: {
							firstName: visitor.user.firstName,
							lastName: visitor.user.lastName,
							email: visitor.user.email
						}
					},
					create: {
						email: visitor.user.email,
						firstName: visitor.user.firstName,
						lastName: visitor.user.lastName,
						title: visitor.user.title,
						organisation: {
							connect: {
								id: params.organisationId
							}
						}
					}
				}
			}
		};
		createVisitors.push(newVisitor);
	}

	const booking = await locals.prisma.booking.create({
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			postcode: data.postcode,
			city: data.city,
			status: data.status,
			price: price,
			event: {
				connect: {
					id: params.eventId
				}
			},
			visitors: {
				create: createVisitors
			}
		},
		include: {
			visitors: {
				select: {
					id: true,
					status: true,
					ticketId: true,
					ticket: true,
					ticketPrice: true,
					activities: true,
					price: true,
					activitiesPrices: true,
					user: {
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

	return new Response(toBookingJSON(booking), { status: 201 });
}
