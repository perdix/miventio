import { organisation } from '$lib/stores.js';
import { get } from 'svelte/store';


export async function load( {fetch, params} ) {

	const res = await fetch(`/organisations/${params.slug}/events`);
	const events = await res.json();
	return {
		events: events
	};
}
