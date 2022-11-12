import { toCategoryJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const category = await locals.prisma.participationCategory.findFirst({
		where: {
			id: params.categoryId,
			eventId: params.eventId
		}
	});
	return new Response(toCategoryJSON(category));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	const category = await locals.prisma.participationCategory.update({
		where: {
			id: params.categoryId
		},
		data: data
	});

	return new Response(toCategoryJSON(category), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedCategory = await locals.prisma.participationCategory.delete({
		where: {
			id: params.categoryId
		}
	});

	return new Response(JSON.stringify(toCategoryJSON(deletedCategory)), { status: 200 });
}
