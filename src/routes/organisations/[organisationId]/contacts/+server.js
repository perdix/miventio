import { toContactsJSON, toContactJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const contacts = await locals.prisma.contact.findMany({
		where: {
			organisationId: params.organisationId
		}, 
		include: { membership: true } 
	});

	return new Response(toContactsJSON(contacts));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	data.organisationId = params.organisationId;
	const contact = await locals.prisma.contact.create({
		data: data
	});

	return new Response(toContactJSON(contact), { status: 201 });
}
