<script>
	import SmallTicket from '$lib/SmallTicket.svelte';
	import Time from 'svelte-time';
	import {booking} from '$lib/store/booking';
	import Cart from '$lib/Registration/Cart.svelte';

	export let event = { tickets: [] };

	let person = { ticket: {}, activities: []};
	let activities = event.activities;

	$: tickets = event.tickets.filter(t => t.category == person.category);

	const selectTicket = (event) => {
		// mark selected ticket
		tickets.forEach(t => t.active = false);
		tickets.find(t => t.id == event.detail.ticket.id).active = true;
		person.ticket = event.detail.ticket
	}

	$: if (person.ticket.date == null) {
		activities = event.activities
	} else {
		activities = event.activities.filter(a => a.start.getDate() == person.ticket.date.getDate())
	}

	$: activityCategories = [...new Set(activities.map(a => a.category))];		


	const next = () => {
		person.activities = activities.filter(a => a.selected == true);
		$booking.cart.push(person);
		$booking = $booking;
		console.log($booking.cart);
	}
	const newPerson = () => {
		person.activities = activities.filter(a => a.selected == true);
		$booking.cart.push(person);
		$booking = $booking;
		console.log($booking.cart);
		// Reset
		person = { ticket: {}, activities: []};
		activities = event.activities;
		tickets = event.tickets;
		tickets.forEach(t => t.active = false);
	}
	
	
</script>

<section>	
	
	<div class="row">
		<div class="selection md-12">
			<div>
				<h3>Persönliche Details</h3>
			</div>
			<div class="row">
				<div class="md-2">
					<label for="title">Titel</label>
					<input id="title" type="text" bind:value="{person.title}" />
				</div>
				<div class="md-5">
					<label for="firstname">Vorname</label>
					<input id="firstname" type="text" bind:value="{person.firstname}" required />
				</div>
				<div class="md-5">
					<label for="lastname">Nachname</label>
					<input id="lastname" type="text" bind:value="{person.lastname}" required />
				</div>

				<div class="md-6">
					<label for="email">E-Mail</label>
					<input id="email" type="email" bind:value="{person.email}" required />
				</div>

				<div class="md-6">
					<label for="category">Teilnahme-Kategorie</label>
					<select name="" id="category" bind:value="{person.category}">
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
				
				{#each tickets as ticket}
			
					<SmallTicket {ticket} on:select={selectTicket} active={ticket.active}></SmallTicket>
	
				{/each}
		
			</div>

			<div class="activities">
				
				<h3>Wählen Sie Ihr Programm</h3>

				<fieldset>
					{#each activityCategories as cat}

						<h4>{cat}</h4>

						
							
						<div class="checkbox">
							{#each activities.filter(a => a.category == cat) as activity}
								<label>
									
									<p class="name">
										<input type="checkbox" bind:checked="{activity.selected}"/>
										<b>{activity.name}</b> | {activity.author} 
									</p>
									<p>
										am <Time timestamp={activity.start} format="DD.MM." /> von <b>
										<Time timestamp={activity.start} format="HH:mm" />
										 - <Time timestamp={activity.end} format="HH:mm" /> </b>
									</p>
								</label>
								{/each}	
						</div>
						

					{/each}

				</fieldset>
			</div>
		</div>



		<div class="footer">
			<button on:click|preventDefault={newPerson}>Zusätzliche Person </button>
			<button on:click|preventDefault={next}> Weiter </button>
		</div>

		<Cart></Cart>
		<!-- <div class="booking">
			{#each $booking.cart as person}
				<div class="booking-item">
					<p>{person.firstname} {person.lastname} | {person.ticket.name} </p>
					<p>{person.ticket.price} €</p>
				</div>
			{/each}
		</div> -->
	


	</div>
</section>

<style>
	input {
		/* background-color: #a0a0a0; */
		border: 1px solid #262626;
		border-radius: 2px;
	}
	label {
		color:#262626;
		font-size: 13px;
	}

	section {
		background-color: white;
		border-radius: 5px;
		padding: 10px 20px;
		margin-bottom: 20px;
	}
	section h3 {
		margin-top: 20px;
		margin-bottom: 0px;
	}
	.selection {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.header h2 {
		font-size: 24px;
		font-weight: 300;
	}
	.footer {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		padding-top: 30px;
	}

	.tickets {
		width: 100%;
		padding: 15px 0;
		padding-top:10px;
		/* background-color: var(--color-1-light); */
	}
	.ticket {
		cursor: pointer;
	}
	
	h3 {
						margin-top: 30px;
						margin-bottom: 5px;
					}
				
					.bg {
						/* background: #e6e6e6; */
						padding: 5px 12px;
						border-radius: 5px;
						margin-bottom: 1px;
					}


	button {
		background-color: #e6e6e6;
		color: #262626;
		border: 1px solid #262626;
		border-radius: 2px;
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
		margin:0;
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
		margin-right:10px;
		cursor: pointer;
	}
	.name b {
		margin-right:5px;
	}
	.booking {
		border-top:1px solid #262626;
		width: 100%;
		margin: 40px 0;
	}

	.booking-item {
		padding: 10px;
		/* border-top:1px solid #262626; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
