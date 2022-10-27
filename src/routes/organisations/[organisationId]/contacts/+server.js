import { toContactsJSON, toContactJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const users = await locals.prisma.user.findMany({
		where: {
			organisation_id: params.organisationId
		}
	});

	return new Response(toContactsJSON(users));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	data.organisation_id = params.organisationId;
	const user = await locals.prisma.user.create({
		data: data
	});

	return new Response(toContactJSON(user), { status: 201 });
}
