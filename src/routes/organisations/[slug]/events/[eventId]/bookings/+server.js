import { toBookingJSON, toBookingsJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const bookings = await locals.prisma.booking.findMany({
		where: {
			organisation_id: params.slug,
			event_id: params.bookingId
		}
	});
	return new Response(toBookingsJSON(bookings));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();



	// Create visits prisma query
	let createVisits = [];
	let price = 0;
	for (const visit of data.visits) {

		// Get ticket
		const ticket = await locals.prisma.ticket.findUnique({
			where: {
				id:  visit.ticket_id
			}
		});
		// Get activities
		const activities = await locals.prisma.activity.findMany({
			where: {
				id:  { in: visit.activities_ids },
			}
		});

		// Calculate prices and statuses
		const visit_price = ticket.price + activities.map(a => a.price).reduce((a, b,) => a+b, 0);
		price += visit_price;
		let visit_status = 'ANGEMELDET'
		if (data.status == 'BEZAHLT') {
			visit_status = 'BEZAHLT';
		}	
		const newVisit = {
			status: visit_status,
			activities: {
				connect: activities.map(a => ({id: a.id}))
			},
			activities_prices: activities.map(a => ({id: a.id, price: a.price})),
			ticket: {
				connect: {
					id: ticket.id
				}
			},
			ticket_price: ticket.price,
			price: visit_price,
			event: {
				connect: {	
					id: params.eventId
				}
			},
			user: {
				connectOrCreate: {
					where: {
						first_name_last_name_email:
						{
						first_name: visit.user.first_name,
						last_name: visit.user.last_name,
						email: visit.user.email
					  }
					},
					  create: {
						email: visit.user.email,
						first_name: visit.user.first_name,
						last_name: visit.user.last_name,
						title: visit.user.title,
						organisation: {
							connect: {
								id: params.slug
							}
						},
					  }
				}
			}

		}
		createVisits.push(newVisit);
	}

	const booking = await locals.prisma.booking.create({
		data: {
			first_name: data.first_name,
			last_name: data.last_name,
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
			visits: {
				create: createVisits
			}
		},
		include: {
			visits: {
				select: {
					id:true,
					status: true,
					ticket_id:true,
					ticket:true,
					ticket_price: true,
					activities: true, 
					price: true,
					activities_prices: true,
					user: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							email: true
						}
					}
				}
			}
		}
	});

	return new Response(toBookingJSON(booking), { status: 201 });
}
