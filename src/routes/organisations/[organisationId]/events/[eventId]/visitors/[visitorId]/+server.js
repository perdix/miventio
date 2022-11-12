import { toVisitorJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visitor = await locals.prisma.visitor.findFirst({
		where: {
			id: params.visitorId,
			eventId: params.eventId
		},
		include: {
			ticket: true,
			activities: true
		}
	});
	return new Response(toVisitorJSON(visitor));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();

	// Update status of visit
	const visitor = await locals.prisma.visit.update({
		where: {
			id: params.visitorId
		},
		data: {
			status: data.status
		}
	});

	return new Response(toVisitorJSON(visitor), { status: 200 });
}
