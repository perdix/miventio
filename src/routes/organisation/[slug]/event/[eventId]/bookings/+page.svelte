<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';
	import Time from 'svelte-time';
	import { bookingStatuses } from '$lib/store/constants';

	$: activityCategories = [...new Set($page.data.activities.map((a) => a.category))];

	let booking = {
		visits: [
			{
				user: { first_name: '' },
				ticket: {},
				activities: [],
				activities_ids: [],
				activities_prices: []
			}
		],
		phone: ''
	};
	let showPopup = false;
	let popupTitle = '';

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newBooking = () => {
		booking = {
			visits: [
				{
					user: { first_name: '' },
					ticket: {},
					activities: [],
					activities_ids: [],
					activities_prices: []
				}
			],
			phone: ''
		};
		popupTitle = 'Neue Buchung';
		togglePopup();
	};

	const editBooking = (editBooking) => {
		booking = editBooking;
		popupTitle = 'Buchung bearbeiten';
		// Map activities to ids to work with checkboxes
		booking.visits.forEach((v) => {
			if ('activities' in v) {
				v.activities_ids = v.activities.map((a) => a.id);
			}
		});
		togglePopup();
	};

	const addVisit = () => {
		booking.visits.unshift({
			user: { first_name: '' },
			ticket: {},
			activities: [],
			activities_ids: [],
			activities_prices: []
		});
		booking = booking;
	};

	const deleteVisit = async (item) => {
		if (item.id != null) {
			booking.visits = booking.visits.filter((v) => v.id != item.id);
		} else {
			booking.visits = booking.visits.filter((v) => v.user.first_name != item.user.first_name);
		}
	};

	const deleteBooking = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings/${booking.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedBooking = await res.json();
			$event.bookings = $event.bookings.filter((a) => a.id != booking.id);
			togglePopup();
		}
	};

	const saveBooking = async () => {
		if ('id' in booking) {
			// console.log(booking);
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/bookings/${booking.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(booking)
				}
			);
			if (res.status === 200) {
				const updatedBooking = await res.json();
				$event.bookings[$event.bookings.findIndex((b) => b.id === updatedBooking.id)] =
					updatedBooking;
				togglePopup();
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
				console.log(newBooking);
				$event.bookings.unshift(newBooking);
				$event = $event;
				togglePopup();
			}
		}
	};
</script>

<Popup title={popupTitle} show={showPopup} on:close={togglePopup}>
	<form class="miventio" on:submit|preventDefault={saveBooking}>
		<div class="booking-detail">
			<div class="visits">
				<div class="flex">
					<h2>Buchungsdaten</h2>
					<a class="add-visit" href="/" on:click|preventDefault={addVisit}>
						<span class="material-symbols-outlined">person_add</span>
					</a>
				</div>
				<div class="scroll">
					{#each booking.visits as item}
						<div class="row visit">
							<div class="md-12 flex">
								<h3>Besucher</h3>
								<a class="delete" href="/" on:click|preventDefault={() => deleteVisit(item)}>
									<span class="material-symbols-outlined">delete</span>
								</a>
							</div>
							<div class="md-3">
								<label for="firstname">Vorname</label>
								<input id="firstname" type="text" bind:value={item.user.first_name} required />
							</div>
							<div class="md-4">
								<label for="lastname">Nachname</label>
								<input id="lastname" type="text" bind:value={item.user.last_name} required />
							</div>
							<div class="md-5">
								<label for="email">E-Mail</label>
								<input id="email" type="email" bind:value={item.user.email} required />
							</div>
							<div class="md-12">
								<label for="ticket">Ticket</label>
								<select id="ticket" bind:value={item.ticket_id} required>
									{#each $page.data.tickets as ticket}
										<option value={ticket.id}
											>{ticket.category} - {ticket.name} ({ticket.price}€)</option
										>
									{/each}
								</select>
							</div>
							<div class="md-12">
								<fieldset>
									{#each activityCategories as cat}
										<h4>{cat}</h4>

										<div class="checkbox">
											{#each $page.data.activities.filter((a) => a.category == cat) as activity}
												<label>
													<p class="name">
														<input
															type="checkbox"
															bind:group={item.activities_ids}
															name="activities"
															value={activity.id}
														/>
														<b>{activity.name}</b>
														{#if activity.author} | {activity.author} {/if}
														{#if activity.price && activity.price > 0} | {activity.price} € {/if}
													</p>
													<p>
														am <Time timestamp={activity.start} format="DD.MM." /> von
														<b>
															<Time timestamp={activity.start} format="HH:mm" />
															- <Time timestamp={activity.end} format="HH:mm" />
														</b>
													</p>
												</label>
											{/each}
										</div>
									{/each}
								</fieldset>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bill">
				<h2>Rechnungsdaten</h2>

				<div class="bill-content row">
					<!-- <div class="md-12">
					<h3>Rechnung</h3>
				</div> -->
					<!-- <div class="md-12">
					{#each booking.visits as visit}
					<article>
					<div>
					 <p>{visit.ticket.name}</p> <p>{visit.ticket_price}€</p>
					</div>
					{#each visit.activities as activity}
					<div>
					   <p>{activity.name}</p> <p>{visit.activities_prices[activity.id]}€</p>
					  </div>
					{/each}
					</article>
					{/each}
					<div class="sum">
						Gesamtsumme: {booking.price} €
					</div>
				</div> -->
					<div class="md-12">
						<label for="status">Status</label>
						<select id="status" bind:value={booking.status} required>
							{#each $bookingStatuses as status}
								<option value={status}>{status}</option>
							{/each}
						</select>
					</div>
					<div class="md-12">
						<br /><br />
						<h3>Rechnungsdaten</h3>
					</div>
					<div class="md-6">
						<label for="firstname">Vorname</label>
						<input id="firstname" type="text" bind:value={booking.first_name} required />
					</div>
					<div class="md-6">
						<label for="lastname">Nachname</label>
						<input id="lastname" type="text" bind:value={booking.last_name} required />
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
				</div>
				<div class="submit">
					<button type="submit">Speichern</button>
				</div>
			</div>
		</div>
	</form>
</Popup>

<Header title={'Buchungen'}>
	<button on:click={newBooking}>
		<span>Neue Buchung</span>
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

<Content>
	<table>
		<thead>
			<tr>
				<th>Buchungsdaten</th>
				<th>Rechnungsdaten</th>
				<th>Gesamtpreis</th>
				<th>Zahlungstatus</th>
			</tr>
		</thead>
		<tbody>
			{#each $event.bookings as booking}
				<tr on:click={() => editBooking(booking)}>
					<td>
						{#each booking.visits as item}
							<div class="bookingdetails">
								<h3>{item.user.first_name} {item.user.last_name}</h3>
								<p>{item.ticket.name}</p>
							</div>
						{/each}
					</td>
					<td>
						{booking.first_name}
						{booking.last_name} <br />
						{booking.address}
						{booking.city}<br />
						{booking.email}
					</td>
					<td>
						{booking.price} €
					</td>
					<td
						><span
							class:paid={booking.status.toUpperCase() == 'BEZAHLT'}
							class:open={booking.status.toUpperCase() == 'OFFEN'}>{booking.status}</span
						></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</Content>

<style>
	.booking-detail {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.bill {
		/* min-height: 100vh; */
		width: 40%;
		padding: 15px;
	}
	.visits {
		width: 60%;
		padding: 15px;
	}
	.scroll {
		/* max-height: 700px;
		overflow-y: scroll; */
	}
	.bill-content {
		margin-top: 10px;
		padding: 30px;
		background-color: var(--grey);
		border-radius: var(--corner);
	}
	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.delete {
		background-color: var(--lightgrey);
		color: var(--color-1-dark);
		padding: 5px 10px;
	}
	.delete .material-symbols-outlined {
		font-size: 1rem;
		font-weight: 300;
	}
	.add-visit {
		background-color: var(--grey);
		color: var(--color-1-dark);
		padding: 8px 12px;
		border-radius: var(--corner);
	}

	.checkbox label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h4 {
		margin-top: 20px;
		font-size: 1.2rem;
		font-weight: 300;
	}
	.checkbox p {
		font-size: 0.9rem;
	}

	.bookingdetails:not(:last-child) {
		margin-bottom: 10px;
	}
	h3 {
		font-size: 1rem;
		font-weight: 400;
		color: var(--color-1-dark);
		display: inline-block;
	}
	.paid {
		border-radius: 15px;
		background-color: var(--color-confirmation);
		padding: 5px 10px;
	}
	.open {
		border-radius: 15px;
		background-color: var(--color-warning);
		padding: 5px 10px;
	}
	.visit {
		background-color: var(--grey);
		padding: 30px;
		margin-top: 10px;
		border-radius: var(--corner);
	}
</style>
