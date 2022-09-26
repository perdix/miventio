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
	
	data.start = (data.start.length < 16) ? `${data.date.substring(0,10)}T${data.start}Z` : data.start
	data.end = (data.end.length < 16) ? `${data.date.substring(0,10)}T${data.end}Z` : data.end
	
	const activity = await locals.prisma.activity.create({
		data: {
			name: data.name,
			start: new Date(Date.parse(data.start)),
			end: new Date(Date.parse(data.end)),
			date: new Date(Date.parse(data.date)),
			description: data.description,
			limit: data.limit,
			price: data.price || 0,	
			location: data.location,
			author: data.author,
			category: data.category,
			event: {
				connect: {
					id: params.eventId
				}
			}
		}
	});

	return new Response(toActivityJSON(activity), { status: 201 });
}
