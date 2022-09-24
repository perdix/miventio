import { toVisitJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';


export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visit = await locals.prisma.visit.findFirst({
		where: {
			id: params.visitId,
			event_id: params.eventId
		},
		include: {
			ticket: true,
			activities: true
		}
	});
	return new Response(toVisitJSON(visit));
}



export async function PUT({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	// Update status of visit
	const visit = await locals.prisma.visit.update({
		where: {
			id: params.visitId
		},
		data: {
			status: data.status
		}
	});
	
	return new Response(toVisitJSON(visit), { status: 200 });
}
