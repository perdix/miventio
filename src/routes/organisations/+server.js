import { isLoggedIn } from '$lib/server/authorization';
import { toOrganisationsJSON } from '$lib/server/serialization';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
	if (!isLoggedIn(locals)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	// Get all organisations of the given user
	const organisations = await locals.prisma.organisation.findMany({
		where: {
			superusers: {
				some: {
					superuser_id: locals.session.id
				}
			}
		}
	});

	return new Response(toOrganisationsJSON(organisations));
}
