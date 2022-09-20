<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import {page} from '$app/stores';
	import { event } from '$lib/store/event'
	import Popup from '$lib/Popup.svelte';

	let booking = { cart: [ { "name": "" }]}
	let showPopup = false;
	let popupTitle = ""

	const togglePopup = () => {
		showPopup = !showPopup;
	}

	const newBooking = () => {
		booking = { cart: [ { "name": "" }]}
		popupTitle = "Neue Anmeldung"
		togglePopup();
	}

	const editBooking = (editBooking) => {
		booking = editBooking;
		console.log(booking);
		popupTitle = "Anmeldung bearbeiten";
		togglePopup();
	}

	const deleteBooking = async () => {

		console.log(booking);
		const res = await fetch(`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings/${booking.id}`, {
				method: 'DELETE',
			});
			if (res.status === 200) {
				const deletedBooking = await res.json();
				$event.bookings = $event.bookings.filter(a => (a.id != booking.id));
				togglePopup();
			}
	}

	const saveBooking = async () => {
		if ('id' in booking) {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings/${booking.id}`, {
				method: 'PUT',
				body: JSON.stringify(booking)
			});
			if (res.status === 200) {
				const updatedBooking= await res.json();
				$event.bookings.map(a => (a.id == updatedBooking.id) ? updatedBooking : a);
				$event = $event;
				togglePopup();
			}
		} else {
			const res = await fetch(`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings`, {
				method: 'POST',
				body: JSON.stringify(booking)
			});
			if (res.status === 201) {
				const newBooking = await res.json();
				$event.bookings.push(newBooking)
				$event = $event;
				togglePopup();
			}
		}
	}



</script>



<Popup title={popupTitle} show={showPopup} on:close={togglePopup}>
		
	<form class="miventio row" on:submit|preventDefault={saveBooking}>

		<div class="md-12">
		<h3>Anmeldung für:</h3>
		</div>

		{#each booking.cart as item}
			<div class="md-12">
				<label for="name">Vor- und Nachname</label>
				<input id="name" type="text" bind:value="{item.name}" required/>
			</div>
		{/each}
		

		<div class="md-6">
			<label for="status">Status</label>
			<input id="status" type="text" bind:value="{booking.status}" required/>
		</div>
		<div class="md-6">
			<label for="total">Betrag</label>
			<input id="total" type="number" step="0.01" bind:value="{booking.total}" required/>
		</div>

		<div class="md-12">
			<br><br>
			<h3>Rechnungsdaten</h3>
		</div>
		<div class="md-12">
			<label for="name">Vor- und Nachname</label>
			<input id="name" type="text" bind:value="{booking.billing_name}" required />
		</div>
		<div class="md-12">
			<label for="address">Adresse</label>
			<input id="address" type="text" bind:value="{booking.billing_address}" required />
		</div>
		<div class="md-4">
			<label for="postcode">Postleitzahl</label>
			<input id="postcode" type="text" bind:value="{booking.billing_postcode}" required/>
		</div>
		<div class="md-8">
			<label for="city">Stadt</label>
			<input id="city" type="text" bind:value="{booking.billing_city}" required/>
		</div>
		<div class="md-12">
			<label for="email">E-Mail</label>
			<input id="email" type="email" bind:value="{booking.billing_email}" />
		</div>

	
		<div class="md-6 submit">
			<button type="submit">Speichern</button>
		</div>
		<div class="md-6 submit right">
			<button class="secondary" type="button" on:click={deleteBooking}>
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
	</form>
</Popup>

<Header title={'Anmeldungen'}>
	<button on:click={newBooking}>
		<span>Neue Anmeldung</span> 
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

<Content>
	<table>
		<thead>
		<tr>
			<th>Anmeldung für</th>
			<th>Rechnungsdaten</th>
			<th>Preis</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>

		{#each $event.bookings as booking}
			<tr on:click={() => editBooking(booking)}>
				<td>
					{#if booking.cart}
						{#each booking.cart as item} 
							{item.name}
						{/each}
					{/if}
				</td>
				<td>
					{booking.billing_name} <br>	
					{booking.billing_address} {booking.billing_city}<br>
					{booking.billing_email}
				</td>
				<td>{booking.total} €</td>
				<td><span class:paid={booking.status.toUpperCase() == 'BEZAHLT'}>{booking.status}</span></td>
				
			</tr>
		{/each}
	</tbody>
	</table>
</Content>

<style>
	.paid {
		border-radius: 15px;
		background-color: lightgreen;
		padding: 5px 10px;
	}
</style>
