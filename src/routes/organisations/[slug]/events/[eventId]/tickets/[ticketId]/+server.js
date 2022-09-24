import { toTicketJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const ticket = await locals.prisma.ticket.findFirst({
		where: {
			id: params.ticketId,
			event_id: params.eventId
		}
	});
	return new Response(toTicketJSON(ticket));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	data.date = new Date(data.date);
	const ticket = await locals.prisma.ticket.update({
		where: {
			id: params.ticketId
		},
		data: data
	});

	return new Response(toTicketJSON(ticket), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedTicket = await locals.prisma.ticket.delete({
		where: {
			id: params.ticketId
		}
	});

	return new Response(JSON.stringify(toTicketJSON(deletedTicket)), { status: 200 });
}
