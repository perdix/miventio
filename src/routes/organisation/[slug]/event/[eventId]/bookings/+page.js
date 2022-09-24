export async function load({ fetch, params }) {
	const tickRes = await fetch(`/organisations/${params.slug}/events/${params.eventId}/tickets`);
	const tickets = await tickRes.json();

	const actRes = await fetch(`/organisations/${params.slug}/events/${params.eventId}/activities`);
	const activities = await actRes.json();

	return {
		tickets,
		activities
	};
}
