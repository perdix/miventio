
export async function load( {fetch, params} ) {

	const res = await fetch(`/organisations/${params.slug}/events/${params.eventId}`);
	const event = await res.json();

	return {
		event: event
	};
}

