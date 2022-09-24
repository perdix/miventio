import { toActivityJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const activity = await locals.prisma.activity.findFirst({
		where: {
			id: params.activityId,
			organisation_id: params.slug
		}
	});
	return new Response(toActivityJSON(activity));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	const activity = await locals.prisma.activity.update({
		where: {
			id: params.activityId
		},
		data: data
	});

	return new Response(toActivityJSON(activity), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const deletedActivity = await locals.prisma.activity.delete({
		where: {
			id: params.activityId
		}
	});

	return new Response(JSON.stringify({ message: 'Activity successfully deleted!' }), {
		status: 200
	});
}
