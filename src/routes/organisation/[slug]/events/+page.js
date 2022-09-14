
export async function load( {fetch} ) {
	const res = await fetch('/organisations/1/events');
	const events = await res.json();
	return {
		events: events
	};
}
