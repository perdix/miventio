<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import { visitStatuses } from '$lib/store/constants';
	import Popup from '$lib/Popup.svelte';

	let visit = { user: {} };
	let showPopup = false;
	let popupTitle = '';

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const editVisit = (editVisit) => {
		visit = editVisit;
		popupTitle = 'Besucher bearbeiten';
		togglePopup();
	};

	const saveVisit = async () => {
		if ('id' in visit) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/visits/${visit.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(visit)
				}
			);
			if (res.status === 200) {
				const updatedVisit = await res.json();
				$event.visits.map((v) => (v.id == updatedVisit.id ? updatedVisit : v));
				$event = $event;
				togglePopup();
			}
		}
	};
</script>

<Popup title={popupTitle} show={showPopup} on:close={togglePopup}>
	<form class="miventio row" on:submit|preventDefault={saveVisit}>
		<div class="md-6">
			<label for="firstname">Vorname</label>
			<input id="firstname" type="text" bind:value={visit.user.first_name} required />
		</div>
		<div class="md-6">
			<label for="lastname">Nachname</label>
			<input id="lastname" type="text" bind:value={visit.user.last_name} required />
		</div>
		<div class="md-6">
			<label for="email">E-Mail</label>
			<input id="email" type="email" bind:value={visit.user.email} />
		</div>
		<div class="md-6">
			<label for="status">Status</label>
			<select name="Status" id="status" bind:value={visit.status}>
				{#each $visitStatuses as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>
		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
	</form>
</Popup>

<Header title={'Besucher'} />

<Content>
	<table>
		<thead>
			<tr>
				<th>Vorname</th>
				<th>Nachname</th>
				<th>E-Mail</th>
				<th>Anmeldestatus</th>
			</tr>
		</thead>
		<tbody>
			{#each $event.visitors as visit}
				<tr on:click={() => editVisit(visit)}>
					<td>
						{visit.user.first_name}
					</td>
					<td>
						{visit.user.last_name}
					</td>
					<td>
						{visit.user.email}
					</td>
					<td><span class:paid={visit.status.toUpperCase() == 'BEZAHLT'}>{visit.status}</span></td>
				</tr>
			{/each}
		</tbody>
	</table>
</Content>

<style>
	.paid {
		border-radius: 15px;
		background-color: var(--color-confirmation);
		padding: 5px 10px;
	}
</style>
