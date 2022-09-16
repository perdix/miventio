import { redirect } from '@sveltejs/kit';

export async function load( {fetch, params, data} ) {

	const res = await fetch('/organisations')
	const organisations = await res.json();

    if (organisations < 1) {
		throw redirect(307, '/organisation/create');
	}

	const organisation = organisations.find(o => o.id == params.slug)
	if (organisation === undefined) {
		throw redirect(307, `/organisation/${organisations[0].id}`);
	}
	organisation.role = data.session.organisations.find(o => o.id == organisation.id).role;
	return {
		organisations: organisations,
		organisation: organisation
	};
}
