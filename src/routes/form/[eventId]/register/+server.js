

export async function POST({ locals, params, request }) {

    const data = await request.json();

    // Get event
    const event = await locals.prisma.event.findUnique({
        where: {
            id:  params.eventId
        }
    });
    if (event == null) {
		return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
	}

	// Create visits prisma query
	let createVisits = [];
	let price = 0;
	for (const visit of data.cart) {

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
		
		const newVisit = {
			status: 'ANGEMELDET',
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
						first_name: visit.first_name,
						last_name: visit.last_name,
						email: visit.email
					  }
					},
					  create: {
						email: visit.email,
						first_name: visit.first_name,
						last_name: visit.last_name,
                        title: visit.title,
						organisation: {
							connect: {
								id: event.organisation_id
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
			status: "OFFEN",
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
	});

    return new Response(JSON.stringify({ message: "Register successful!"}), { status: 201 });
}