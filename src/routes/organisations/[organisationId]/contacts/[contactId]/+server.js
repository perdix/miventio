import { toContactJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const event = await locals.prisma.contact.findFirst({
		where: {
			id: params.contactId,
			organisation_id: params.organisationId
		}
	});

	return new Response(toContactJSON(event));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();

	const user = await locals.prisma.contact.update({
		where: {
			id: params.contactId
		},
		data: data
	});

	return new Response(toContactJSON(user));
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedUser = await locals.prisma.contact.delete({
		where: {
			id: params.contactId
		}
	});

	return new Response(JSON.stringify({ message: 'Contact successfully deleted!' }), {
		status: 200
	});
}
