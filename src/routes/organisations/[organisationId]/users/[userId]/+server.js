import { toUserJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const user = await locals.prisma.user.findFirst({
		where: {
			id: params.userId,
			organisationId: params.organisationId
		}
	});
	return new Response(toUserJSON(user));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	const user = await locals.prisma.user.update({
		where: {
			id: params.userId
		},
		data: data
	});

	return new Response(toUserJSON(user));
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const deletedUser = await locals.prisma.user.delete({
		where: {
			id: params.userId
		}
	});

	return new Response(JSON.stringify({ message: 'User successfully deleted!' }), {
		status: 200
	});
}
