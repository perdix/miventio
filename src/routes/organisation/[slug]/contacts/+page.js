export async function load() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await res.json();
	const contacts = users.map((u) => ({ ...u, status: 'Student' }));

	return {
		contacts: contacts
	};
}
