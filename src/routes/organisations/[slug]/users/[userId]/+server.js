import { toSuperuserJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const superuser = await locals.prisma.superuser.findFirst({
		where: {
			id: params.superuserId,
			organisation_id: params.slug
		}
	});
	return new Response(toSuperuserJSON(superuser));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	const user = await locals.prisma.superuser.update({
		where: {
			id: params.superuserId
		},
		data: data
	});

	return new Response(toSuperuserJSON(user));
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const deletedSuperuser = await locals.prisma.superuser.delete({
		where: {
			id: params.superuserId
		}
	});

	return new Response(JSON.stringify({ message: 'Superuser successfully deleted!' }), {
		status: 200
	});
}
