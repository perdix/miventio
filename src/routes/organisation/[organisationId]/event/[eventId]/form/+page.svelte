<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Notification from '$lib/Notification.svelte';
	const url = `${$page.url.origin}/form/${$page.params.eventId}`;
	let saved = false;
	let eventData = { ...$event };

	const updateFormOptions = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.data.event.id}`,
			{
				method: 'PUT',
				body: JSON.stringify(eventData)
			}
		);
		if (res.status === 200) {
			const updatedEvent = await res.json();
			$event = updatedEvent;
			saved = true;

		}
	}
</script>

<Notification bind:show={saved} message="Formulareinstellung wurde gespeichert!"></Notification>

<Header title={'Anmeldeformular'} />

<Content>

	<h3>Link zum Anmeldeformular</h3>

	<div>
		<a href={url} target="_blank">{url}</a>
	</div>

	<form class="miventio row" on:submit|preventDefault={updateFormOptions}>
		<div class="col-6">
			<label for="von">Online-Anmeldung von</label>
			<input id="von" type="date" bind:value={eventData.bookingStart} />
		</div>
		<div class="col-6">
			<label for="bis">Online-Anmeldung bis</label>
			<input id="bis" type="date" bind:value={eventData.bookingEnd} />
		</div>

		<div class="col-12 submit">
			<button type="submit">Speichern</button>
		</div>
	</form>


</Content>

<style>
	h3 {
		font-weight: 400;
	}
	a {
		background-color: white;
		padding: 15px;
		display: block;
		font-size: 1rem;
	}
</style>
