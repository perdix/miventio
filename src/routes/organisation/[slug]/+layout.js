import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params, data }) {
	
	// Fetch detailed organisation
	const res = await fetch(`/organisations/${params.slug}`);
	if (res.status != 200) {
		throw redirect(307, `/login`);
	}
	const organisation = await res.json();

	// Enrich with role
	organisation.role = data.session.organisations.find((o) => o.id == organisation.id).role;

	return {
		session: data.session,
		organisation
	};
}
