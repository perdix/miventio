export async function load({ fetch, params }) {
	const contactsPromise = fetch(`/organisations/${params.organisationId}/contacts`).then((c) =>
		c.json()
	);
	const membershipsPromise = fetch(`/organisations/${params.organisationId}/memberships`).then(
		(m) => m.json()
	);

	const data = await Promise.all([contactsPromise, membershipsPromise]);

	return {
		contacts: data[0],
		memberships: data[1]
	};
}
