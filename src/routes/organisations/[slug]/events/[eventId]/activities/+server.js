import { toActivityJSON, toActivitiesJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const activities = await locals.prisma.activity.findMany({
		where: {
			event_id: params.eventId
		}
	});
	return new Response(toActivitiesJSON(activities));
}

export async function POST({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.slug)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	data.event_id = params.eventId;
	const activity = await locals.prisma.activity.create({
		data: data
	});

	return new Response(toActivityJSON(activity), { status: 201 });
}
