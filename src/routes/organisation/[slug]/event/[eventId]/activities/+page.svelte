<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import {page} from '$app/stores';
	import { event } from '$lib/store/event'
	import Popup from '$lib/Popup.svelte';


	let activity = {}
	let showPopup = false;
	let popupTitle = ""

	const togglePopup = () => {
		showPopup = !showPopup;
	}

	const newActivity = () => {
		activity = {}
		popupTitle = "Neue Aktivität"
		togglePopup();
	}

	const editActivity = (act) => {
		activity = act;
		popupTitle = "Aktivität bearbeiten";
		togglePopup();
	}

	const deleteActivity = async (act) => {
		const res = await fetch(`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/activities/${activity.id}`, {
				method: 'DELETE',
			});
			if (res.status === 200) {
				const deletedActivity = await res.json();
				$event.activities = $event.activities.filter(a => (a.id != activity.id));
				// $event = $event;
				togglePopup();
			}
	}

	const saveActivity = async () => {
		if ('id' in activity) {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/activities/${activity.id}`, {
				method: 'PUT',
				body: JSON.stringify(activity)
			});
			if (res.status === 200) {
				const updatedActivity = await res.json();
				$event.activities.map(a => (a.id == updatedActivity.id) ? updatedActivity : a);
				$event = $event;
				togglePopup();
			}
		} else {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/activities`, {
				method: 'POST',
				body: JSON.stringify(activity)
			});
			if (res.status === 201) {
				const newActivity = await res.json();
				$event.activities.push(newActivity)
				$event = $event;
				togglePopup();
			}
		}
	}

</script>

<div class="page">



<Popup title={popupTitle} show={showPopup} on:close={togglePopup}>
		
	<form class="miventio row" on:submit|preventDefault={saveActivity}>
		<div class="md-12">
			<label for="Name">Name</label>
			<input id="name" type="text" bind:value="{activity.name}" required />
		</div>
		<div class="md-12">
			<label for="description">Beschreibung</label>
			<input id="description" type="text" bind:value="{activity.description}" />
		</div>
		<div class="md-4">
			<label for="start">Datum</label>
			<input id="start" type="date" bind:value="{activity.date}" />
		</div>
		<div class="md-4">
			<label for="start">Start</label>
			<input id="start" type="time" bind:value="{activity.start}" />
		</div>
		<div class="md-4">
			<label for="end">Ende</label>
			<input id="end" type="time" bind:value="{activity.end}" />
		</div>
		<div class="md-12">
			<label for="location">Location</label>
			<input id="location" type="text" bind:value="{activity.location}" />
		</div>
		<div class="md-6">
			<label for="limit">Limit</label>
			<input id="limit" type="number" bind:value="{activity.limit}" />
		</div>
		<div class="md-6">
			<label for="price">Preis</label>
			<input id="price" type="number" step="0.01" bind:value="{activity.price}" />
		</div>
		
		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
		<div class="md-6 submit right">
			<button class="secondary" type="button" on:click={deleteActivity}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>

	</form>
</Popup>


<Header title={'Aktivitäten'}>
	<button on:click={newActivity}>
		<span>Neue Aktivität</span> 
		<span class="material-symbols-outlined">add_circle</span></button>
</Header>

<Content>
	<table>
		<thead>
		<tr>
			<th>Title</th>
			<th>Beschreibung</th>
			<th>Start</th>
			<th>Ende</th>
			<th>Preis</th>
			<th>Besucher-Limit</th>
		</tr>
	</thead>
	<tbody>
		{#each $event.activities as activity}
			<tr on:click={() => editActivity(activity)}>
				<td>{activity.name}</td>
				<td>{activity.description || ''}</td>
				<td>{activity.start || ''}</td>
				<td>{activity.end || ''}</td>
				<td>{activity.price || '-'}</td>
				<td>{activity.limit || '-'}</td>
			</tr>
		{/each}
	</tbody>
	</table>

</Content>

</div>

<style>
	h3 {
		margin-bottom: var(--unit);
	}
</style>
