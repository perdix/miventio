import { toTicketJSON, toTicketsJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const tickets = await locals.prisma.ticket.findMany({
		where: {
			event_id: params.eventId
		},
		include: {
			event: true
		}
	});
	return new Response(toTicketsJSON(tickets));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();
	data.date = new Date(Date.parse(data.date));
	data.event_id = params.eventId;
	const ticket = await locals.prisma.ticket.create({
		data: data
	});

	return new Response(toTicketJSON(ticket), { status: 201 });
}
