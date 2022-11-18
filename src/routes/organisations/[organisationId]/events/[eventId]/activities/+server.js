import { toActivityJSON, toActivitiesJSON } from '$lib/server/serialization';
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
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
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();
	data.start = (data.start.length < 16) ? `${data.date.substring(0,10)}T${data.start}Z` : data.start;

	// Add eventId for tickets
	if (data.tickets) {
		for (let i=0; i< data.tickets.length; i++) {
			data.tickets[i].eventId = params.eventId;
		}
	}

	// Generate create data object
	let createData = {
		name: data.name,
		start: new Date(Date.parse(data.start)),
		date: new Date(Date.parse(data.date)),
		description: data.description,
		limit: data.limit,
		speaker: data.speaker,
		type: data.type,
		identifier: data.identifier,
		location: data.location,
		author: data.author,
		status: data.status,
		event: {
			connect: {
				id: params.eventId
			}
		},
		tickets: {
			create: data.tickets
		}
	}
	// Add end date if given
	if (data.end) {
		const end = (data.end.length < 16) ? `${data.date.substring(0,10)}T${data.end}Z` : data.end;
		createData.end = new Date(Date.parse(end));
	}
	
	const activity = await locals.prisma.activity.create({
		data: createData,
		select: {
			id: true,
			name: true,
			identifier: true,
			description: true,
			speaker: true,
			limit: true,
			location: true,
			date: true,
			start: true,
			end: true,
			type: true,
			tickets: {
				select: {
					id: true,
					name: true,
					price: true,
					visitorCategoryId: true,
					visitorCategory: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		}
	});
	return new Response(toActivityJSON(activity), { status: 201 });
}
