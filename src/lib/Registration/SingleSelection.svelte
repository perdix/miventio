<script>
	import Time from 'svelte-time';
	import { booking } from '$lib/store/booking';
	let item = { ticket: {}, activities: [], ticket_id: null, activities_ids: [] };
	import { createEventDispatcher } from 'svelte';
	import {page} from '$app/stores';
	const dispatch = createEventDispatcher();


	const tickets = $page.data.event.tickets;
	let activities = $page.data.event.activities;

	$: item.ticket = tickets.find(t => t.id == item.ticket_id);

	$: item.activities = $page.data.event.activities.filter(a => item.activities_ids.includes(a.id));

	$: if (item.ticket && item.ticket.date) {
			activities = $page.data.event.activities.filter(a => a.start.getDate() == item.ticket.date.getDate())
	} else {
		activities = $page.data.event.activities
	}
	$: activityCategories = [...new Set(activities.map(a => a.category))];

	const submit = (e) => {
		if (e.submitter.id == 'next') {
			dispatch('addItem', {
				item: {...item}, 
				next: true
			});
		} else {
			dispatch('addItem', {
				item: {...item}, 
			});
			item = { ticket: {}, activities: [], ticket_id: null, activities_ids: [] }
		}
		

	} 

	// const selectCategory = (category) => {
	// 	if (category != "") {
	// 		item.tickets.forEach(t => {
	// 			if (t.category != category) {
	// 				t.hidden = true;
	// 			} else {
	// 				t.hidden = false;
	// 			}
	// 		});
	// 	} else {
	// 		item.tickets.forEach(t => t.hidden = false);
	// 	}
	// 	$booking = $booking;
	// }

	// const selectTicket = (ticket) => {
	// 	item.tickets.forEach(t => t.selected = false)
	// 	ticket.selected = true;
	// 	item.ticket = ticket;
	// 	if (ticket.date != null) {
	// 		item.activities.forEach(a => {
	// 			if (a.start.getDate() != ticket.date.getDate()) {
	// 				a.hidden = true;
	// 			} else {
	// 				a.hidden = false;
	// 			}
	// 		});
	// 	} else {
	// 		item.activities.forEach(a => a.hidden = false);
	// 	}
	// 	$booking = $booking;
	// }
</script>

<form class="register" on:submit|preventDefault={submit} >
<div>
	<h3>Persönliche Details</h3>
</div>
<div class="row">
	<div class="md-2">
		<label for="title">Titel</label>
		<input id="title" type="text" bind:value={item.title} />
	</div>
	<div class="md-5">
		<label for="firstname">Vorname</label>
		<input id="firstname" type="text" bind:value={item.first_name} required />
	</div>
	<div class="md-5">
		<label for="lastname">Nachname</label>
		<input id="lastname" type="text" bind:value={item.last_name} required />
	</div>

	<div class="md-12">
		<label for="email">E-Mail</label>
		<input id="email" type="email" bind:value={item.email} required />
	</div>
</div>
<div>
	<h3>Wählen Sie Ihr Ticket</h3>
</div>

<div class="md-12">
	<select id="ticket" bind:value={item.ticket_id} required>
		{#each tickets as ticket}
			<option value="{ticket.id}">{ticket.category}:{ticket.name} ({ticket.price}€)
				{#if ticket.date}
				- <Time timestamp={ticket.date} format="DD.MM." />
				{/if}
			</option>	
		{/each}
	</select>
</div>

<div class="activities">
	<h3>Wählen Sie Ihr Programm</h3>

	<fieldset>
		{#each activityCategories as cat}
			<h4>{cat}</h4>

			<div class="checkbox">
				{#each activities.filter((a) => a.category == cat) as activity}
					<label class:hidden={activity.hidden}>
						<p class="name">
				
							<input type="checkbox" bind:group={item.activities_ids} name="activities" value={activity.id} />
							<b>{activity.name}</b> 
							{#if activity.author}
							| {activity.author}
							{/if}
							{#if activity.price > 0}
							| {activity.price} €
							{/if}
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

<div class="footer">
	<button id="add">Zusätzliche Person </button>
	<button id="next"> Weiter </button>
</div>

</form>

<style>
	.hidden {
		display: none !important;
	}
	input {
		/* background-color: #a0a0a0; */
		border: 1px solid #262626;
		border-radius: 2px;
	}
	label {
		color: #262626;
		font-size: 13px;
	}
	.footer {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding-top: 30px;
	}

	.tickets {
		width: 100%;
		padding: 15px 0;
		padding-top: 10px;
		/* background-color: var(--color-1-light); */
	}

	h3 {
		margin-top: 15px;
		margin-bottom: 5px;
	}


	.activities {
		width: 100%;
	}
	h4 {
		margin-top: 10px;
		margin-bottom: 5px;
		font-weight: 300;
	}

	fieldset {
		display: block;
	}

	.checkbox label {
		margin: 0;
		padding: 5px 0;
		margin-left: 10px;
		display: flex;

		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.name {
		display: flex;
		align-items: center;
	}
	.name input {
		margin-right: 10px;
		cursor: pointer;
	}
	.name b {
		margin-right: 5px;
	}

</style>
