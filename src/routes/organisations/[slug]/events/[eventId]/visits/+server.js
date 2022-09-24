import { toVisitsJSON } from '$lib/server/serialization';
import { isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const visits = await locals.prisma.visit.findMany({
		where: {
			organisation_id: params.slug,
			event_id: params.visitId
		},
		include: {
			user: true
		}
	});
	return new Response(toVisitsJSON(visits));
}
