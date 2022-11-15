<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';
	import { visitorStatuses, bookingStatuses } from '$lib/store/constants';	

	// Booking
	let booking = { visitors: []}
	let showBooking = false;
	let bookingTitle = ''
	const toggleBooking = () => {
		showBooking = !showBooking;
	};
	const editBooking = (b) => {
		booking = b;
		bookingTitle = 'Rechnungsdaten bearbeiten';
		toggleBooking();
	};
	const createBooking = (visitor) => {
		bookingTitle = 'Rechnungsdaten';
		booking = { visitors: [{ firstName: visitor.firstName, lastName: visitor.lastName, id: visitor.id, price: visitor.price}], firstName: visitor.firstName, lastName: visitor.lastName, email: visitor.email, status: 'OFFEN'}
		toggleBooking();
	};
	const saveBooking = async () => {
		if ('id' in booking) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings/${booking.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(booking)
				}
			);
			if (res.status === 200) {
				const updatedBooking = await res.json();
				refreshVisitors();
				toggleBooking();
			}
		} else {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings`,
				{
					method: 'POST',
					body: JSON.stringify(booking)
				}
			);
			if (res.status === 201) {
				const newBooking = await res.json();
				refreshVisitors();
				toggleBooking();
			}
		}
	};

	const deleteBooking = async() => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings/${booking.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedBooking = await res.json();
			refreshVisitors();
			toggleBooking();
		}
	};

	const refreshVisitors = async () => {
		// Update event with fresh list of visitors
		fetch(`${$page.url.origin}/organisations/${$page.params.organisationId}/events/${$page.params.eventId}/visitors`)
		.then((r) => r.json()).then(visitors => {
			$event.visitors = visitors;
		});
	}

	let visitor = { categoryId: null, activityTicketsIds: [], status: ''};
	let showPopup = false;
	let popupTitle = '';
	let tickets = $event.tickets;
	let activityTickets = $event.activityTickets;


	$: {
		if (visitor.categoryId) {
			console.log(visitor.categoryId)
			tickets = $event.tickets.filter(t => t.visitorCategory == null || t.visitorCategoryId == visitor.categoryId);
			activityTickets = $event.activityTickets.filter(a => a.visitorCategoryId == visitor.categoryId);
			console.log(activityTickets)
		}
	}

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newVisitor = () => {
		visitor = {categoryId: null, activityTicketsIds: [], status: 'ANGEMELDET'}
		popupTitle = 'Neuer Teilnehmer';
		togglePopup();
	};

	const editVisitor = (v) => {
		visitor = v;
		v.activityTicketsIds = v.activityTickets.map(a => a.id);
		popupTitle = 'Teilnehmer bearbeiten';
		togglePopup();
	};


	const deleteVisitor = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/visitors/${visitor.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedVisitor = await res.json();
			$event.visitors = $event.visitors.filter((a) => a.id != visitor.id);
			togglePopup();
		}
	};

	const saveVisitor = async () => {
		if ('id' in visitor) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/visitors/${visitor.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(visitor)
				}
			);
			if (res.status === 200) {
				const updatedVisitor = await res.json();
				$event.visitors[$event.visitors.findIndex((b) => b.id === updatedVisitor.id)] = updatedVisitor;
				togglePopup();
			}
		} else {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/visitors`,
				{
					method: 'POST',
					body: JSON.stringify(visitor)
				}
			);
			if (res.status === 201) {
				const newVisitor = await res.json();
				$event.visitors.unshift(newVisitor);
				$event = $event;
				togglePopup();
			}
		}
	};

</script>




<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'1200px'}>
	<form class="miventio row" on:submit|preventDefault={saveVisitor}>
		<div class="md-6">
			<label for="firstname">Vorname</label>
			<input id="firstname" type="text" bind:value={visitor.firstName} required />
		</div>
		<div class="md-6">
			<label for="lastname">Nachname</label>
			<input id="lastname" type="text" bind:value={visitor.lastName} required />
		</div>
		<div class="md-12">
			<label for="email">E-Mail</label>
			<input id="email" type="email" bind:value={visitor.email} required />
		</div>
		<div class="md-6">
			<label for="category">Teilnahmekategorie</label>
			<select name="category" id="category" bind:value={visitor.categoryId}>
				{#each $event.visitorCategories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
		</div>
		<div class="md-6">
			<label for="status">Teilnahmestatus</label>
			<select name="status" id="status" bind:value={visitor.status}>
				{#each $visitorStatuses as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>
		<div class="md-12">
			<label for="ticket">Ticketauswahl</label>
			<select name="ticket" id="ticket" bind:value={visitor.eventTicketId}>
				{#each tickets as ticket}
					<option value={ticket.id}>{ticket.name} | { ticket.visitorCategory ? ticket.visitorCategory.name : 'Allgemein' } | Preis: {ticket.price}€</option>
				{/each}
			</select>
		</div>

		<div class="md-12">
			<label for="activity">Programmauswahl</label>
			{#each activityTickets as activityTicket}
				<label class="activity">
						<input type="checkbox" bind:group={visitor.activityTicketsIds} value={activityTicket.id}>
						<b>{activityTicket.activity.type}</b> {activityTicket.activity.name} ({activityTicket.activity.speaker || 'K. Referent'}) | {activityTicket.price}€
				</label>
			{/each}
		</div>

		<div class="md-12">
			<label for="price">Gesamtpreis</label>
			<input id="price" type="number" bind:value={visitor.price} required />
		</div>

		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
		<div class="md-6 submit right">
			<button type="button" on:click={deleteVisitor}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
		<!-- <div class="md-12">
			<br><br>
			<div class="mini-header">
				<h2>Rechnungsdaten</h2>
				<button class="icon" on:click|preventDefault={editBooking}>
					<span class="material-symbols-outlined">receipt</span>
				</button>
			</div>
		</div> -->
	</form>
</Popup>


<Popup title={bookingTitle} show={showBooking} on:close={toggleBooking} maxWidth={'900px'}>
	<form class="miventio row" on:submit|preventDefault={saveBooking}>


	<div class="md-6">
		<label for="names">Rechnung für</label>
		{#each booking.visitors as visitor}
				<p class="visitor">{visitor.firstName} {visitor.lastName}</p>
			{/each}
	</div>
	<div class="md-6">
		<label for="status">Rechnungsstatus</label>
		<select name="status" id="status" bind:value={booking.status}>
			{#each $bookingStatuses as status}
				<option value={status}>{status}</option>
			{/each}
		</select>
	</div>

	<div class="md-6">
		<label for="firstname">Vorname</label>
		<input id="firstname" type="text" bind:value={booking.firstName} required />
	</div>
	<div class="md-6">
		<label for="lastname">Nachname</label>
		<input id="lastname" type="text" bind:value={booking.lastName} required />
	</div>
	<div class="md-12">
		<label for="address">Adresse</label>
		<input id="address" type="text" bind:value={booking.address} required />
	</div>
	<div class="md-4">
		<label for="postcode">Postleitzahl</label>
		<input id="postcode" type="text" bind:value={booking.postcode} required />
	</div>
	<div class="md-8">
		<label for="city">Stadt</label>
		<input id="city" type="text" bind:value={booking.city} required />
	</div>
	<div class="md-6">
		<label for="email">E-Mail</label>
		<input id="email" type="email" bind:value={booking.email} required />
	</div>
	<div class="md-6">
		<label for="phone">Telefon</label>
		<input id="phone" type="text" bind:value={booking.phone} />
	</div>
	<div class="md-6 submit">
		<button type="submit">Speichern</button>
	</div>
	<div class="md-6 submit right">
		<button type="button" on:click={deleteBooking}>
			<span class="material-symbols-outlined">delete</span>
		</button>
	</div>
</form>
</Popup>

<Header title={'Teilnehmer'}>
	<button on:click={newVisitor}>
		<span>Neuer Teilnehmer</span>
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

<Content>
	<table>
		<thead>
			<tr>
				<th>Teilnehmer</th>
				<th>Kategorie</th>
				<th>Gesamtpreis</th>
				<th>Teilnahmestatus</th>
				<th>Rechnungsdetails</th>
			</tr>
		</thead>
		<tbody>
			{#each $event.visitors as visitor}
				<tr on:click={() => editVisitor(visitor)}>
	
					<td>
						{visitor.firstName}
						{visitor.lastName} <br />
						{visitor.email}
					</td>
					<td>
						{visitor.category.name}
					</td>
					<td>
						{visitor.price} €
					</td>
					<td>
						{visitor.status} 
						</td>
						<td>
							{#if visitor.booking}
							
							<a href="" on:click|preventDefault|stopPropagation={() => editBooking(visitor.booking)}>
								
							    <span class="status" class:paid={visitor.booking.status.toUpperCase() == 'BEZAHLT'} class:open={visitor.booking.status.toUpperCase() == 'OFFEN'}>
									<span class="material-symbols-outlined">receipt</span>
									{visitor.booking.status} 
								</span>	
							</a>
							{:else}
							<a href="" on:click|preventDefault|stopPropagation={() => createBooking(visitor)}>
							    <span class="status">
									<span class="material-symbols-outlined">receipt</span>
									Rechnung erstellen?
								</span>	
							</a>
							{/if}
							
						</td>


				</tr>
			{/each}
		</tbody>
	</table>
</Content>

<style>
	.activity {
		background-color: var(--white);
		padding: 10px;
	}
	h2 {
		font-size: 1.3rem;
		font-weight: 300;
		color: var(--black);
	}
	.mini-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	/* .booking {
		background-color: var(--grey);
		padding: 10px;
		margin-top: 10px;
		border-radius: var(--corner);
	} */
	.status {
		padding: 5px 10px;
		border-radius: 15px;
		color:black;
		background-color: rgba(39, 39, 39, 0.044);
	}
	.status .material-symbols-outlined {
		font-size: 16px;
	}
	.paid {
		background-color: var(--color-confirmation);
	}
	.open {
		background-color: var(--color-warning);
	}
	.visitor {
		background-color: var(--grey);
		padding: 0.9rem 1rem;
		margin-left: 3px;
		display: block;
	}
</style>
