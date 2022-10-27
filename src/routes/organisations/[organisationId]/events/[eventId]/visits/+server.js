import { toVisitsJSON } from '$lib/server/serialization';
import { isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visits = await locals.prisma.visit.findMany({
		where: {
			organisation_id: params.organisationId,
			event_id: params.visitId
		},
		include: {
			user: true
		}
	});
	return new Response(toVisitsJSON(visits));
}
