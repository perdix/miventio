
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization';
import { toActivityJSON } from '$lib/server/serialization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const activity = await locals.prisma.activity.findFirst({
		where: {
			id: params.activityId,
			organisationId: params.organisationId
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
					in: data.tickets.map((a) => a.id).filter((i) => i != undefined)
				}
			}
		}
	});


	// Override other activityTickets
	for (const ticket of data.tickets) {
		const updatedTicket = await locals.prisma.activityTicket.upsert({
			where: { id: ticket.id || '' },
			update: {
				name: ticket.name,
				price: ticket.price,
				visitorCategoryId: ticket.visitorCategoryId
			},
			create: {
				name: ticket.name,
				price: ticket.price,
				visitorCategoryId: ticket.visitorCategoryId,
				activityId: params.activityId,
				eventId: params.eventId
			}
		});
	}

	// Update Activity
	data.start = (data.start.length < 16) ? `${data.date.substring(0,10)}T${data.start}Z` : data.start

	let updateData = {
		name: data.name,
		start: new Date(Date.parse(data.start)),
		date: new Date(Date.parse(data.date)),
		description: data.description,
		limit: data.limit,
		identifier: data.identifier,
		type: data.type,
		speaker: data.speaker,
		location: data.location,
	}
	if (data.end) {
		const end = (data.end.length < 16) ? `${data.date.substring(0,10)}T${data.end}Z` : data.end;
		updateData.end = new Date(Date.parse(end));
	}

	const activity = await locals.prisma.activity.update({
		where: {
			id: params.activityId
		},
		data: updateData,
		select: {
			id: true,
			identifier:true,
			name: true,
			description: true,
			speaker: true,
			limit: true,
			location: true,
			date: true,
			start: true,
			end: true,
			type: true,
			_count: {
				select: { visitors: true },
			  },
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
