import { toTicketJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const ticket = await locals.prisma.eventTicket.findFirst({
		where: {
			id: params.ticketId,
			event_id: params.eventId
		}
	});
	return new Response(toTicketJSON(ticket));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();

	const ticket = await locals.prisma.eventTicket.update({
		where: {
			id: params.ticketId
		},
		data: {
			name: data.name,
			price: data.price,
			availableFrom: data.availableFrom ? new Date(Date.parse(data.availableFrom)): null,
			availableTo: data.availableTo ? new Date(Date.parse(data.availableTo)): null,
			dayTicketDate: data.dayTicketDate ? new Date(Date.parse(data.dayTicketDate)): null,
			visitorCategoryId: data.visitorCategoryId
		}, 
		select: {	
			id: true,
			name: true,
			price: true,
			availableFrom: true,
			availableTo: true,
			dayTicketDate: true,
			visitorCategoryId: true,
			visitorCategory: {
				select: {
					id: true,
					name: true
				}
			}
		}
	});

	return new Response(toTicketJSON(ticket), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedTicket = await locals.prisma.eventTicket.delete({
		where: {
			id: params.ticketId
		}
	});

	return new Response(JSON.stringify(toTicketJSON(deletedTicket)), { status: 200 });
}
