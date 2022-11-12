
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';
import { toActivityJSON } from '$lib/server/serialization';

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

	// Delete activityTickets which are not given anymore
	const deletedTickets = await locals.prisma.activityTicket.deleteMany({
		where: {
			activityId: params.activityId,
			id: {
				not: {
					in: data.activityTickets.map((a) => a.id).filter((i) => i != undefined)
				}
			}
		}
	});


	// Override other activityTickets
	for (const ticket of data.activityTickets) {
		const updatedTicket = await locals.prisma.activityTicket.upsert({
			where: { id: ticket.id || '' },
			update: {
				name: ticket.name,
				price: ticket.price,
				participationCategoryId: ticket.participationCategoryId
			},
			create: {
				name: ticket.name,
				price: ticket.price,
				participationCategoryId: ticket.participationCategoryId,
				activityId: params.activityId
			}
		});
	}

	// Update Activity
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
			type: data.type,
			speaker: data.speaker,
			location: data.location,
		},
		select: {
			id: true,
			name: true,
			description: true,
			speaker: true,
			limit: true,
			location: true,
			date: true,
			start: true,
			end: true,
			activityTickets: {
				select: {
					id: true,
					name: true,
					price: true,
					participationCategoryId: true,
					participationCategory: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		}
	});

	console.log(activity)

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
