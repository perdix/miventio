import { toContactJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const event = await locals.prisma.user.findFirst({
		where: {
			id: params.contactId,
			organisation_id: params.slug
		}
	});

	return new Response(toContactJSON(event));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();

	const user = await locals.prisma.user.update({
		where: {
			id: params.contactId
		},
		data: data
	});

	return new Response(toContactJSON(user));
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedUser = await locals.prisma.user.delete({
		where: {
			id: params.contactId
		}
	});

	return new Response(JSON.stringify({ message: 'Contact successfully deleted!' }), {
		status: 200
	});
}
