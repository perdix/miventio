export async function load({ fetch, params }) {
	const res = await fetch(`/organisations/${params.organisationId}/memberships`);
	const memberships = await res.json();
	return {
		memberships: memberships
	};
}
