<script>
	import Header from '$lib/blocks/Header.svelte';
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
		ticket.dayTicketDate = ticket.dayTicketDate ? ticket.dayTicketDate.substring(0,10) : ticket.dayTicketDate;
		ticket.availableFrom = ticket.availableFrom ? ticket.availableFrom.substring(0,10) : ticket.availableFrom;
		ticket.availableTo = ticket.availableTo ? ticket.availableTo.substring(0,10) : ticket.availableTo;
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
				let updatedTickets = $event.tickets.map((t) => {
					return t.id == updatedTicket.id ? updatedTicket : t;
					
				});
				$event.tickets = updatedTickets;
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
			<label for="category">Teilnehmer-Kategorie</label>
			<select name="category" id="category" bind:value={ticket.visitorCategoryId}>
				{#each $event.visitorCategories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
		</div>

		<div class="md-6">
			<label for="price">Preis in Euro</label>
			<input id="price" type="number" step="0.01" bind:value={ticket.price} required />
		</div>
		<div class="md-6">
			<label for="end">Ist es ein Tagesticket?</label>
			<input id="end" type="date" bind:value={ticket.dayTicketDate} />
		</div>
		<div class="md-6">
			<label for="start">Online verfügbar von</label>
			<input id="start" type="date" bind:value={ticket.availableFrom}/>
		</div>
		<div class="md-6">
			<label for="end">Online verfügbar bis</label>
			<input id="end" type="date" bind:value={ticket.availableTo} />
		</div>


		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
		<div class="md-6 submit right">
			<button type="button" on:click={deleteTicket}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
	</form>
</Popup>



<Header title={'Ticketvarianten'}>
	<button on:click={newTicket}>
		<span>Neue Ticketvariante</span>
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Kategorie</th>
			<th>Preis</th>
			<th>Tagesticket</th>
			<th>Verfügbar von</th>
			<th>Verfügbar bis</th>
		</tr>
	</thead>
	<tbody>
		{#each $event.tickets as ticket}
			<tr on:click={() => editTicket(ticket)}>
				<td>
					{ticket.name}
				</td>
				<td>{#if ticket.visitorCategory}{ticket.visitorCategory.name}{/if} </td>
				<td>{#if ticket.price}{ticket.price} €{/if}</td>
				<td>{#if ticket.dayTicketDate}{ticket.dayTicketDate.substring(0,10)} {/if}</td>
				<td>{#if ticket.availableFrom}{ticket.availableFrom.substring(0,10)} {/if}</td>
				<td>{#if ticket.availableTo}{ticket.availableTo.substring(0,10)} {/if}</td>
				
			</tr>
		{/each}
	</tbody>
</table>


<style>

</style>
