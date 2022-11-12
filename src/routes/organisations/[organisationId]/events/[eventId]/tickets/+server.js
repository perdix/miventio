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
	const ticket = await locals.prisma.eventTicket.create({
		data: {
			name: data.name,
			price: data.price,
			availableFrom: data.availableFrom ? new Date(Date.parse(data.availableFrom)): null,
			availableTo: data.availableTo ? new Date(Date.parse(data.availableTo)): null,
			dayTicketDate: data.dayTicketDate ? new Date(Date.parse(data.dayTicketDate)): null,
			participationCategoryId: data.participationCategoryId,
			eventId: params.eventId
		}, 
		select: {	
			id: true,
			name: true,
			price: true,
			availableFrom: true,
			availableTo: true,
			dayTicketDate: true,
			participationCategoryId: true,
			participationCategory: {
				select: {
					id: true,
					name: true
				}
			}
		}
	});

	return new Response(toTicketJSON(ticket), { status: 201 });
}
