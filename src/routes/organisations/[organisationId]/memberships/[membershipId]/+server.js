import { toMembershipJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const event = await locals.prisma.membership.findFirst({
		where: {
			id: params.membershipId,
			organisationId: params.organisationId
		}
	});

	return new Response(toMembershipJSON(event));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();

	const membership = await locals.prisma.membership.update({
		where: {
			id: params.membershipId
		},
		data: {
			color: data.color,
			name: data.name,
			descripription: data.descripription,
			price: data.price
		}
	});

	return new Response(toMembershipJSON(membership));
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedMembership = await locals.prisma.membership.delete({
		where: {
			id: params.membershipId
		}
	});

	return new Response(JSON.stringify({ message: 'Membership successfully deleted!' }), {
		status: 200
	});
}
