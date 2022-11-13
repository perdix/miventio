<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import { visitStatuses } from '$lib/store/constants';
	import Popup from '$lib/Popup.svelte';

	let visitor = {};
	let showPopup = false;
	let popupTitle = '';



	console.log($event.visitors)
	console.log("----------------")

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newVisitor = () => {
		visitor = {};
		popupTitle = 'Neuer Besucher';
		togglePopup();
	};

	const editVisitor = (v) => {
		visitor = v;
		popupTitle = 'Besucher bearbeiten';
		togglePopup();
	};

	const saveVisitor = async () => {
		if ('id' in visitor) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/visits/${visitor.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(visit)
				}
			);
			if (res.status === 200) {
				const updatedVisitoror = await res.json();
				$event.visitors.map((v) => (v.id == updatedVisitoror.id ? updatedVisitoror : v));
				$event = $event;
				togglePopup();
			}
		}
	};
</script>

<Popup title={popupTitle} show={showPopup} on:close={togglePopup}>
	<form class="miventio row" on:submit|preventDefault={saveVisitor}>
		<div class="md-6">
			<label for="firstname">Vorname</label>
			<input id="firstname" type="text" bind:value={visitor.firstName} required />
		</div>
		<div class="md-6">
			<label for="lastname">Nachname</label>
			<input id="lastname" type="text" bind:value={visitor.lastName} required />
		</div>
		<div class="md-6">
			<label for="email">E-Mail</label>
			<input id="email" type="email" bind:value={visitor.email} />
		</div>
		<div class="md-6">
			<label for="status">Status</label>
			<select name="Status" id="status" bind:value={visitor.status}>
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

<Header title={'Besucher'} >
	<button on:click={newVisitor}>
		<span>Neuer Besucher</span>
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

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
			{#each $event.visitors as visitor}
				<tr on:click={() => editVisitor(visit)}>
					<td>
						{visitor.firstName}
					</td>
					<td>
						{visitor.lastName}
					</td>
					<td>
						{visitor.email}
					</td>
					<td><span class:paid={visitor.status.toUpperCase() == 'BEZAHLT'}>{visitor.status}</span></td>
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
