import { toUsersJSON, toUserJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const users = await locals.prisma.user.findMany({
		where: {
			organisationId: params.organisationId
		}
	});
	return new Response(toUsersJSON(users));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();
	data.organisationId = params.organisationId;
	// Change to upsert!!
	const user = await locals.prisma.user.create({
		data: data
	});

	return new Response(toUserJSON(user), { status: 201 });
}
