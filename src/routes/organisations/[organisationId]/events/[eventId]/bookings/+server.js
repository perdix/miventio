import { toBookingJSON, toBookingsJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const bookings = await locals.prisma.booking.findMany({
		where: {
			organisationId: params.organisationId,
		},
		include: {
			visitors: {
				select: {
					id: true,
					status: true,
					eventTicket: true,
					eventTicketId: true,
					eventTicketPrice: true,
					activityTicketsPrices: true,
					price: true,
					activities: true,
				}
			}
		}
	});
	return new Response(toBookingsJSON(bookings));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();

	let visitorIds = [];
	let totalPrice = 0;
	if (data.visitors) {
		visitorIds = data.visitors ? data.visitors.map(v => ({ id: v.id})) : [];
		totalPrice = data.visitors.map(v => v.price).reduce((a,b) => a + b, 0)
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
			price: totalPrice,
			event: {
				connect: { id: params.eventId }
			},	
			visitors: {
				connect: visitorIds
			}
		},
		select: {
			visitors: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
				}
			}
		}
	});
	
	

	return new Response(toBookingJSON(booking), { status: 201 });
}
