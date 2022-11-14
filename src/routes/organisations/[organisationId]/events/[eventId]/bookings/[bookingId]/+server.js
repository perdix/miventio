import { toBookingJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const booking = await locals.prisma.booking.findFirst({
		where: {
			id: params.bookingId,
			organisation_id: params.organisationId
		}
	});
	return new Response(toBookingJSON(booking));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	
	// Update booking
	const updatedBooking = await locals.prisma.booking.update({
		where: {
			id: params.bookingId
		},
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			postcode: data.postcode,
			city: data.city,
			status: data.status,
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

	return new Response(toBookingJSON(updatedBooking), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedBooking = await locals.prisma.booking.delete({
		where: {
			id: params.bookingId
		}
	});

	return new Response(toBookingJSON(deletedBooking), {
		status: 200
	});
}
