import { error } from '@sveltejs/kit';
import { toEventJSON } from '$lib/server/serialization';

export async function load(request) {
	const eventId = request.params.eventId;
	if (eventId === undefined) {
		throw error(400, 'You need to give a valid Id!');
	}

	const event = await request.locals.prisma.event.findUnique({
		where: {
			id: eventId
		},
		include: {
			tickets: {
				select: {
					id: true,
					name: true,
					price: true,
					availableFrom: true,
					availableTo: true,
					dayTicketDate: true,
					visitorCategoryId: true,
					visitorCategory: {
						select: {
							id: true,
							name: true
						}
					}
				}
			},
			activities: {
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
					type:true,
					visitors: true,
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
			},
			activityTickets: {
				select: {
					id: true,
					price: true,
					visitorCategoryId: true,
					_count: {
						select: { visitors: true },
					},
					activity: {
						select: {
							id: true,
							name: true,
							speaker: true,
							limit: true,
							location: true,
							date: true,
							start: true,
							end: true,
							type:true
						}
					}
				}
			},
			visitorCategories: {
				select: {
					id: true,
					name: true,
					type: true,
				}
			}
		}
	});

	if (!event || !event.start) {
		throw error(400, 'No valid event found!');
	}
	
	return {
		event
	};
}
