export async function POST({ locals, params, request }) {
	const data = await request.json();

	// Get event
	const event = await locals.prisma.event.findUnique({
		where: {
			id: params.eventId
		}
	});
	if (event == null) {
		return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
	}

	// Create visits prisma query
	let createVisitors = [];
	let totalPrice = 0;
	for (const visitor of data.visitors) {
		// Get ticket
		const eventTicket = await locals.prisma.eventTicket.findUnique({
			where: {
				id: visitor.eventTicket.id
			}
		});
		// Get activities tickets
		const activityTickets = await locals.prisma.activityTicket.findMany({
			where: {
				id: { in: visitor.activityTickets.map((a) => a.id) }
			}
		});
		// Get category
		const category = await locals.prisma.visitorCategory.findFirst({
			where: {
				id: data.categoryId
			}
		});

		// Calculate prices and statuses
		const visitorPrice =
			eventTicket.price + activityTickets.map((a) => a.price).reduce((a, b) => a + b, 0);
		totalPrice += visitorPrice;

		const newVisitor = {
			firstName: visitor.firstName,
			lastName: visitor.lastName,
			email: visitor.email,
			eventTicket: {
				connect: {
					id: eventTicket.id
				}
			},
			event: {
				connect: {
					id: event.id
				}
			},
			category: {
				connect: {
					id: visitor.categoryId
				}
			},
			type: category.type,
			status: 'ANGEMELDET',
			price: visitorPrice,
			eventTicketPrice: eventTicket.price,
			activityTicketsPrices: activityTickets.map((a) => a.price),
			activities: {
				connect: activityTickets.map((a) => ({ id: a.activityId }))
			},
			activityTickets: {
				connect: activityTickets.map((a) => ({ id: a.id }))
			},
			contact: {
				connectOrCreate: {
					where: {
						firstName_lastName_email: {
							firstName: visitor.firstName,
							lastName: visitor.lastName,
							email: visitor.email
						}
					},
					create: {
						email: visitor.email,
						firstName: visitor.firstName,
						lastName: visitor.lastName,
						type: visitor.type,
						organisation: {
							connect: {
								id: event.organisationId
							}
						}
					}
				}
			}
		};
		createVisitors.push(newVisitor);
	}

	await locals.prisma.booking.create({
		data: {
			status: 'OFFEN',
			firstName: data.firstName || '',
			lastName: data.lastName || '',
			email: data.email || '',
			address: data.address || '',
			postcode: data.postcode || '',
			city: data.city || '',
			phone: data.phone,
			price: totalPrice,
			event: {
				connect: {
					id: event.id
				}
			},
			visitors: {
				create: createVisitors
			}
		}
	});

	return new Response(JSON.stringify({ message: 'Register successful!' }), { status: 201 });
}
