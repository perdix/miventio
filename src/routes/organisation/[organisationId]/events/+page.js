export async function load({ fetch, params }) {
	const res = await fetch(`/organisations/${params.organisationId}/events`);
	const events = await res.json();
	return {
		events: events
	};
}
