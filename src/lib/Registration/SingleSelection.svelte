<script>
	import Time from 'svelte-time';
	import SmallTicket from '$lib/SmallTicket.svelte';
	import { booking } from '$lib/store/booking';
	export let item = { ticket: {}, activities: [] };
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();


	$: activityCategories = [...new Set(item.activities.map((a) => a.category))];

	const submit = (e) => {
		if (e.submitter.id == 'next') {
			dispatch('addItem', {
				item: item, 
				next: true
			});
		} else {
			dispatch('addItem', {
				item: item, 
			});
		}
		

	} 

	const selectCategory = (category) => {
		if (category != "") {
			item.tickets.forEach(t => {
				if (t.category != category) {
					t.hidden = true;
				} else {
					t.hidden = false;
				}
			});
		} else {
			item.tickets.forEach(t => t.hidden = false);
		}
		$booking = $booking;
	}

	const selectTicket = (ticket) => {
		item.tickets.forEach(t => t.selected = false)
		ticket.selected = true;
		item.ticket = ticket;
		if (ticket.date != null) {
			item.activities.forEach(a => {
				if (a.start.getDate() != ticket.date.getDate()) {
					a.hidden = true;
				} else {
					a.hidden = false;
				}
			});
		} else {
			item.activities.forEach(a => a.hidden = false);
		}
		$booking = $booking;
	}
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
		<input id="firstname" type="text" bind:value={item.firstname} required />
	</div>
	<div class="md-5">
		<label for="lastname">Nachname</label>
		<input id="lastname" type="text" bind:value={item.lastname} required />
	</div>

	<div class="md-6">
		<label for="email">E-Mail</label>
		<input id="email" type="email" bind:value={item.email} required />
	</div>

	<div class="md-6">
		<label for="category">Teilnahme-Kategorie</label>
		<select name="" id="category" bind:value={item.category} on:change="{() => selectCategory(item.category)}">
			<option value=""></option>
			<option value="ALLGEMEIN">Allgemein</option>
			<option value="STUDENT">Student</option>
			<option value="MITGLIED">Mitglied</option>
		</select>
	</div>
</div>
<div>
	<h3>Wählen Sie Ihr Ticket</h3>
</div>

<div class="tickets">
	{#each item.tickets as ticket}
		<div on:click="{() => selectTicket(ticket)}" class:hidden={ticket.hidden}>
			<SmallTicket {ticket} />
	    </div>	
	{/each}
</div>

<div class="activities">
	<h3>Wählen Sie Ihr Programm</h3>

	<fieldset>
		{#each activityCategories as cat}
			<h4>{cat}</h4>

			<div class="checkbox">
				{#each item.activities.filter((a) => a.category == cat) as activity}
					<label class:hidden={activity.hidden}>
						<p class="name">
							<input type="checkbox" bind:checked={activity.selected} />
							<b>{activity.name}</b> | {activity.author}
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
		margin-top: 30px;
		margin-bottom: 5px;
	}


	.activities {
		width: 100%;
	}
	h4 {
		margin-top: 20px;
		margin-bottom: 10px;
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
