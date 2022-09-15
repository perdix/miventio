
export async function load( {fetch} ) {

	
	const res = await fetch('/organisations');
	const organisations = await res.json();
	return {
		organisations: organisations
	};
}

