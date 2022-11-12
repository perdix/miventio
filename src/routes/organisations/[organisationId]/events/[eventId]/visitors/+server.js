import { toVisitorsJSON } from '$lib/server/serialization';
import { isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visitors = await locals.prisma.visitor.findMany({
		where: {
			organisation_id: params.organisationId,
			eventId: params.visitId
		},
		include: {
			user: true
		}
	});
	return new Response(toVisitorsJSON(visitors));
}
