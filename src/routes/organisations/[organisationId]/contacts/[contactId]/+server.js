import { toContactJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const event = await locals.prisma.contact.findFirst({
		where: {
			id: params.contactId,
			organisationId: params.organisationId
		},
		include: { membership: true }
	});

	return new Response(toContactJSON(event));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	if ('membership' in data) {
		delete data.membership;
	}
	if ('membershipId' in data && data.membershipId == '') {
		data.membershipId = null;
	}
	const contact = await locals.prisma.contact.update({
		where: {
			id: params.contactId
		},
		data: data,
		include: { membership: true }
	});

	return new Response(toContactJSON(contact));
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedContact = await locals.prisma.contact.delete({
		where: {
			id: params.contactId
		},
		include: { membership: true }
	});

	return new Response(toContactJSON(deletedContact), {
		status: 200
	});
}
