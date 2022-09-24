import { toBookingJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const booking = await locals.prisma.booking.findFirst({
		where: {
			id: params.bookingId,
			organisation_id: params.slug
		}
	});
	return new Response(toBookingJSON(booking));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	// Find booking
	const booking = await locals.prisma.booking.findUnique({
		where: {
			id: params.bookingId
		},
		include: {
			visits: true
		}
	});
	if (booking == null) {
		return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
	}

	// Get update data
	const data = await request.json();

	// Should be refactored to put everything into one transaction!

	// Deletion of all visits which are not here anymore
	const deleteVisits = await locals.prisma.visit.deleteMany({
		where: {
			id: {
				not: {
					in: data.visits.map((v) => v.id).filter((i) => i != undefined)
				}
			}
		}
	});

	// Update or Insert new visits
	let price = 0;
	for (const visit of data.visits) {
		// Get Ticket and Activities
		const ticket = await locals.prisma.ticket.findUnique({
			where: {
				id: visit.ticket_id
			}
		});
		// Get activities
		const activities = await locals.prisma.activity.findMany({
			where: {
				id: { in: visit.activities_ids }
			}
		});
		// Calculate prices and statuses
		const visit_price = ticket.price + activities.map((a) => a.price).reduce((a, b) => a + b, 0);
		price += visit_price;
		let visit_status = visit.status;
		if (data.status == 'BEZAHLT') {
			visit_status = 'BEZAHLT';
		}
		if (data.status == 'STORNIERT') {
			visit_status = 'STORNIERT';
		}

		const updatedVisit = await locals.prisma.visit.upsert({
			where: { id: visit.id || '' },
			update: {
				status: visit_status,
				activities: {
					set: [],
					connect: visit.activities_ids.map((a) => ({ id: a }))
				},
				booking: {
					connect: { id: params.bookingId }
				},
				user: {
					connectOrCreate: {
						where: {
							first_name_last_name_email: {
								first_name: visit.user.first_name,
								last_name: visit.user.last_name,
								email: visit.user.email
							}
						},
						create: {
							email: visit.user.email,
							first_name: visit.user.first_name,
							last_name: visit.user.last_name,
							organisation: {
								connect: {
									id: params.slug
								}
							}
						}
					}
				},
				event: {
					connect: { id: params.eventId }
				},
				ticket: {
					connect: { id: ticket.id }
				},
				ticket_price: ticket.price,
				price: visit_price,
				activities_prices: activities.map((a) => ({ id: a.id, price: a.price }))
			},
			create: {
				status: visit_status,
				activities: {
					connect: visit.activities_ids.map((a) => ({ id: a }))
				},
				booking: {
					connect: { id: params.bookingId }
				},
				user: {
					connectOrCreate: {
						where: {
							first_name_last_name_email: {
								first_name: visit.user.first_name,
								last_name: visit.user.last_name,
								email: visit.user.email
							}
						},
						create: {
							email: visit.user.email,
							first_name: visit.user.first_name,
							last_name: visit.user.last_name,
							organisation: {
								connect: {
									id: params.slug
								}
							}
						}
					}
				},
				event: {
					connect: { id: params.eventId }
				},
				ticket: {
					connect: { id: ticket.id }
				},
				ticket_price: ticket.price,
				price: visit_price,
				activities_prices: activities.map((a) => ({ id: a.id, price: a.price }))
			}
		});
	}

	// Update booking
	const updatedBooking = await locals.prisma.booking.update({
		where: {
			id: params.bookingId
		},
		data: {
			price: price,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
			address: data.address,
			postcode: data.postcode,
			city: data.city,
			status: data.status,
			event: {
				connect: {
					id: params.eventId
				}
			}
		},
		include: {
			visits: {
				select: {
					id: true,
					status: true,
					ticket: true,
					ticket_id: true,
					ticket_price: true,
					price: true,
					activities: {
						select: {
							id: true,
							name: true,
							description: true,
							start: true,
							end: true,
							limit: true,
							location: true,
							author: true,
							price: true,
							event_id: true,
							category: true
						}
					},
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

	return new Response(toBookingJSON(updatedBooking), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedBooking = await locals.prisma.booking.delete({
		where: {
			id: params.bookingId
		}
	});

	return new Response(JSON.stringify({ message: 'Booking successfully deleted!' }), {
		status: 200
	});
}
