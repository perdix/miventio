import { toSuperusersJSON, toSuperuserJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const superusers = await locals.prisma.superuser.findMany({
		where: {
			organisation_id: params.organisationId
		}
	});
	return new Response(toSuperusersJSON(superusers));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();
	data.organisation_id = params.organisationId;
	// Change to upsert!!
	const superuser = await locals.prisma.superuser.create({
		data: data
	});

	return new Response(toSuperuserJSON(superuser), { status: 201 });
}
