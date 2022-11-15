<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import { goto } from '$app/navigation';
	let eventData = { ...$event };

	const updateEvent = async () => {
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
		}
	};
	const deleteEvent = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.data.event.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedEvent = await res.json();
			goto(`/organisation/${$page.data.organisation.id}/events`);
		}
	};
</script>

<Header title={'Allgemeine Daten'}>
	<span class="material-symbols-outlined delete" on:click={deleteEvent}>delete</span>
</Header>

<Content>
	<form class="miventio row" on:submit|preventDefault={updateEvent}>
		<div class="md-12">
			<label for="Name">Veranstaltungstitel</label>
			<input id="name" type="text" bind:value={eventData.name} />
		</div>
		<div class="md-12">
			<label for="description">Beschreibung</label>
			<input id="description" type="text" bind:value={eventData.description} />
		</div>
		<div class="md-6">
			<label for="location">Location</label>
			<input id="location" type="text" bind:value={eventData.location} />
		</div>
		<div class="md-6">
			<label for="city">Stadt</label>
			<input id="city" type="text" bind:value={eventData.city} />
		</div>
		<div class="md-6">
			<label for="von">Eventbeginnn</label>
			<input id="von" type="date" bind:value={eventData.start} />
		</div>
		<div class="md-6">
			<label for="bis">Eventende</label>
			<input id="bis" type="date" bind:value={eventData.end} />
		</div>

		<div class="md-12 submit">
			<button type="submit">Speichern</button>
		</div>
	</form>
</Content>



<style>
	h2 {
		font-size: 20px;
	}
</style>
