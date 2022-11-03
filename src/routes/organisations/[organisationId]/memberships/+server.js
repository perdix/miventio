import { toMembershipsJSON, toMembershipJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const memberships = await locals.prisma.membership.findMany({
		where: {
			organisationId: params.organisationId
		}, 

		include: {
			_count: {
				select: { contacts: true },
			},
		}
	
	});
	return new Response(toMembershipsJSON(memberships));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	data.organisationId = params.organisationId;
	const membership = await locals.prisma.membership.create({
		data: data
	});

	return new Response(toMembershipJSON(membership), { status: 201 });
}
