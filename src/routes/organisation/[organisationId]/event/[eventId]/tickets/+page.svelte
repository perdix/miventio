<script>
	import Header from '$lib/blocks/Header.svelte';
	import Ticket from '$lib/Ticket.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';

	let ticket = {};
	let showPopup = false;
	let popupTitle = '';

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newTicket = () => {
		ticket = {};
		popupTitle = 'Neues Ticket';
		togglePopup();
	};

	const editTicket = (editTicket) => {
		ticket = editTicket;
		popupTitle = 'Ticket bearbeiten';
		togglePopup();
	};

	const deleteTicket = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/tickets/${ticket.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedTicket = await res.json();
			$event.tickets = $event.tickets.filter((t) => t.id != ticket.id);
			togglePopup();
		}
	};

	const saveTicket = async () => {
		if ('id' in ticket) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/tickets/${ticket.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(ticket)
				}
			);
			if (res.status === 200) {
				const updatedTicket = await res.json();
				$event.tickets.map((t) => (t.id == updatedTicket.id ? updatedTicket : t));
				$event = $event;
				togglePopup();
			}
		} else {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/tickets`,
				{
					method: 'POST',
					body: JSON.stringify(ticket)
				}
			);
			if (res.status === 201) {
				const newTicket = await res.json();
				$event.tickets.push(newTicket);
				$event = $event;
				togglePopup();
			}
		}
	};
</script>

<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
	<form class="miventio row" on:submit|preventDefault={saveTicket}>
		<div class="md-6">
			<label for="name">Ticketname</label>
			<input id="name" type="text" bind:value={ticket.name} required />
		</div>

		<div class="md-6">
			<label for="price">Preis in Euro</label>
			<input id="price" type="number" step="0.01" bind:value={ticket.price} />
		</div>

		<div class="md-12">
			<br />
			<h3>Ticketvariante</h3>
		</div>

		<div class="md-6">
			<label for="date">Datum, wenn es ein Tagesticket ist!</label>
			<input id="date" type="date" bind:value={ticket.date} />
		</div>

		<div class="md-6">
			<label for="mode">Kategorie</label>
			<input id="mode" type="text" bind:value={ticket.category} placeholder="Student / Mitglied / ..."/>
		</div>

		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
		<div class="md-6 submit right">
			<button class="secondary" type="button" on:click={deleteTicket}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
	</form>
</Popup>

<Header title={'Tickets'}>
	<button on:click={newTicket}>
		<span>Neues Ticket</span>
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

<div class="tickets">
	{#each $event.tickets as ticket}
		<div on:click={() => editTicket(ticket)}>
			<Ticket {ticket} event={$event} />
		</div>
	{/each}
</div>

<style>
	h3 {
		margin: 10px 0;
	}
	.tickets {
		/* display: flex;
		justify-content: space-evenly; */
	}
</style>
