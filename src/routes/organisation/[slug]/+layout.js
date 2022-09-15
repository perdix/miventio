
export async function load( {fetch, params} ) {

	const res = await fetch('/organisations');
	const organisations = await res.json();

	return {
		organisations: organisations,
		organisation: organisations.find( i => i.id == params.slug)
	};
}

