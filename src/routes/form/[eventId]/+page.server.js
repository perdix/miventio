import { error } from '@sveltejs/kit';


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
			tickets: true,
			activities: true
		}
	});

	if (event === null) {
		throw error(400, 'You need to give a valid eventId!');
	}

	return {
		event
	};
}
