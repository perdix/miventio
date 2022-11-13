import { toCategoryJSON, toCategoriesJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const categories = await locals.prisma.visitorCategory.findMany({
		where: {
			eventId: params.eventId
		},
		include: {
			event: true
		}
	});
	return new Response(toCategoriesJSON(categories));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();
	data.eventId = params.eventId;
	const category = await locals.prisma.visitorCategory.create({
		data: data
	});

	return new Response(toCategoryJSON(category), { status: 201 });
}
