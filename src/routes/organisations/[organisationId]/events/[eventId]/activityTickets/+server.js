import { toActivityTicketsJSON } from '$lib/server/serialization';
import { isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visitors = await locals.prisma.activityTicket.findMany({
		where: {
			eventId: params.eventId
		},
		select: {
			id: true,
			price: true,
			visitorCategoryId: true,
			activity: {
				select: {
					id: true,
					name: true,
					speaker: true,
					limit: true,
					location: true,
					date: true,
					start: true,
					end: true,
					type: true
				}
			}
		}
	});
	return new Response(toActivityTicketsJSON(visitors));
}
