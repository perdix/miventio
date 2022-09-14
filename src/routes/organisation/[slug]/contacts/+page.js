

export async function load( {fetch} ) {
	const res = await fetch('/organisations/1/contacts');
	const users = await res.json();
	return {
		contacts: users
	};
}
