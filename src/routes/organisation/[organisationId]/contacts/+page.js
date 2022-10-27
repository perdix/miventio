export async function load({ fetch, params }) {
	const res = await fetch(`/organisations/${params.organisationId}/contacts`);
	const contacts = await res.json();
	return {
		contacts: contacts
	};
}
