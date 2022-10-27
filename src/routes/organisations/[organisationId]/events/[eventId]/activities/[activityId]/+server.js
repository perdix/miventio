import { toActivityJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const activity = await locals.prisma.activity.findFirst({
		where: {
			id: params.activityId,
			organisation_id: params.organisationId
		}
	});
	return new Response(toActivityJSON(activity));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	
	const data = await request.json();
	data.start = (data.start.length < 16) ? `${data.date.substring(0,10)}T${data.start}Z` : data.start
	data.end = (data.end.length < 16) ? `${data.date.substring(0,10)}T${data.end}Z` : data.end


	const activity = await locals.prisma.activity.update({
		where: {
			id: params.activityId
		},
		data: {
			name: data.name,
			start: new Date(Date.parse(data.start)),
			end: new Date(Date.parse(data.end)),
			date: new Date(Date.parse(data.date)),
			description: data.description,
			limit: data.limit,
			price: data.price || 0,
			author: data.author,
			category: data.category,
			location: data.location,
		}
	});

	return new Response(toActivityJSON(activity), { status: 200 });
}

export async function DELETE({ locals, params }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
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
