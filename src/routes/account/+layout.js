

export async function load({ fetch, data }) {


    let res = await fetch(`/superusers/${data.session.id}`)
	const superuser = await res.json();

    return {
        user: superuser
    }


}