export async function load({ fetch, data }) {
	let res = await fetch(`/users/${data.session.id}`);
	const user = await res.json();

	return {
		user: user
	};
}
