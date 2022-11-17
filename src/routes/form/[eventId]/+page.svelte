<script>
	import { page } from '$app/stores';
	import { slide, fly, fade } from 'svelte/transition';
	import Spinner from '$lib/Spinner.svelte';

	let event = $page.data.event;
	let step = 1;
	let wait = false;
	let warning = {}

	// Check for booking start and end
	if (!event.bookingStart) {
		step = 0;
		warning = { title: 'Online-Anmeldung nicht verfügbar!', message: ''}
	} else {
		if (event.bookingStart.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)) {
			step = 0;
			warning = { title: 'Online-Anmeldung noch nicht geöffnet', message: `Die Online-Anmeldung ist ab dem ${event.bookingStart.toLocaleDateString()} möglich!`}
		}
		if (event.bookingEnd && event.bookingEnd.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) {
			step = 0;
			warning = { title: 'Online-Anmeldung geschlossen!', message: 'Die Online-Anmeldung ist geschlossen, bitte melden Sie sich vor Ort an!'}
		}
	}
		
	let booking = { visitors: []};
	let visitor = { categoryId: null, activityTickets: [], eventTicket: {}}
	let tickets = event.tickets;
	let activityTickets = event.activityTickets;

	$: total = visitor.eventTicket.price + visitor.activityTickets.map(a => a.price).reduce((a,b) => a+b, 0);

	$: validVisitorCategories = event.visitorCategories.filter(v => v.type == "Teilnehmer");

	$: {
		if (visitor.categoryId) {
			tickets = event.tickets.filter(t => t.visitorCategory == null || t.visitorCategoryId == visitor.categoryId);
			activityTickets = event.activityTickets.filter(a => a.visitorCategoryId == visitor.categoryId);
		}
	}

	
	const saveAndNext = () => {
		step++;
	}
	const previous = () => {
		step--;
	}
	const submitOrder = async () => {
		wait = true;
		booking.visitors.push(visitor);
		step++;
		const res = await fetch(`/form/${event.id}/register`, {
			method: 'POST',
			body: JSON.stringify(booking)
		});
		if (res.status === 201) {
			booking = { visitors: [] };
			step++;
		}
	}


</script>

<div class="registration">
	<h1>Anmeldung</h1>
	<h2>{event.name}</h2>


	{#if step == 0}
	<section class="warning" in:fade>
		<div class="check">
			<h3>{warning.title}</h3>
			<p>{warning.message}</p>
		</div>
	</section>
	{/if}

	
	{#if step == 1}
	<section class="category">

		<h3>Besucher</h3>
		
		<form class="register row" on:submit|preventDefault={saveAndNext}>			
			<div class="col-12">
				<label for="category">Teilnahme als</label>
				<select name="category" id="category" bind:value={visitor.categoryId} required>
					{#each validVisitorCategories as category}
						<option value={category.id}>{category.name}</option>
					{/each}
				</select>
			</div>
			<div class="col-6">
				<label for="firstname">Vorname</label>
				<input id="firstname" type="text" bind:value={visitor.firstName} required />
			</div>
			<div class="col-6">
				<label for="lastname">Nachname</label>
				<input id="lastname" type="text" bind:value={visitor.lastName} required />
			</div>
			<div class="col-12">
				<label for="email">E-Mail</label>
				<input id="email" type="email" bind:value={visitor.email} required />
			</div>
			<div class="col-12 right submit">
				<button type="submit">Weiter</button>
			</div>
		</form>
	</section>
	{/if}

	{#if step == 2}
	<section class="tickets" in:fly="{{ x: 300, duration: 700 }}">

		<h3>Programm</h3>
		<form class="register row" on:submit|preventDefault={saveAndNext}>

			<div class="col-12">
				<label for="ticket">Ticketauswahl</label>
				<select name="ticket" id="ticket" bind:value={visitor.eventTicket} required>
					{#each tickets as ticket}
						<option value={ticket}>{ticket.name} | { ticket.visitorCategory ? ticket.visitorCategory.name : 'Allgemein' } | Preis: {ticket.price}€</option>
					{/each}
				</select>
			</div>
	
			<div class="col-12">
				<label for="activity">Zusatzprogramm</label>
				{#each activityTickets as activityTicket}
					<label class="activity" class:disabled="{activityTicket._count.visitors >= activityTicket.activity.limit}">
							<input type="checkbox" bind:group={visitor.activityTickets} value={activityTicket} disabled='{activityTicket._count.visitors >= activityTicket.activity.limit}'>
							<b>{activityTicket.activity.type}</b> {activityTicket.activity.name} ({activityTicket.activity.speaker || 'K. Referent'}) | {activityTicket.price}€
					</label>
				{/each}
			</div>
			<div class="col-6 submit">
				<button type="submit" on:click|preventDefault={previous}>Zurück</button>
			</div>
			<div class="col-6 right submit">
				<button type="submit">Weiter</button>
			</div>
		</form>
	</section>
	{/if}


	{#if step == 3}
	<section class="overview" in:fly="{{ x: 300, duration: 700 }}">
		<h3>Gesamtüberblick</h3>
		<br>
		<br>
		<form class="register row" on:submit|preventDefault={submitOrder}>

			<div class="col-12">
				<h4>{visitor.firstName || ''} {visitor.lastName || ''}</h4>
			</div>

			{#if Object.keys(visitor.eventTicket).length > 0}
			<div class="col-6">
				<p><b>Veranstaltungsticket:</b> {visitor.eventTicket.name || ''}</p>
			</div>
			<div class="col-6 right">
				
				<p>{visitor.eventTicket.price || ''}€</p>
			</div>
			{/if}
			
			<div class="col-6">
				{#each visitor.activityTickets as activityTicket}
				<p><b>{activityTicket.activity.type}:</b> {activityTicket.activity.name}</p>
				{/each}
			</div>

			<div class="col-6 right">
				<div>
				{#each visitor.activityTickets as activityTicket}
				<p>{activityTicket.price}€</p>
				{/each}
				</div>
			</div>

			{#if total}
			<div class="sum col-6">
				<p><b>Gesamtpreis</b></p>
			</div>
			<div class="sum col-6 right">
				<p><b>{total}€</b></p>
			</div>
			{/if}
			
			<div class="col-6 submit">
				<button type="submit" on:click|preventDefault={previous}>Zurück</button>
			</div>
			<div class="col-6 right submit">
				<button type="submit" disabled={wait}>Verbindlich teilnehmen</button>
			</div>
		</form>
	</section>
	{/if}

	{#if step == 4}
	<section class="confirmation" in:fade>
		<div class="check">
			<Spinner/>
			<h3>Anfrage wird gesendet!</h3>			
		</div>

	</section>
	{/if}

	{#if step == 5}
	<section class="confirmation" in:fade>
		<div class="check">
			<span class="material-symbols-outlined">
				check_circle
				</span>
			<h3>Teilnahmebestätigung</h3>
			<p>Vielen Dank, wir freuen uns auf Sie!</p>
			
		</div>

	</section>
	{/if}

</div>

<style>
	.registration {
		min-width: 350px;
		max-width: 600px;
		margin:auto;
	}
	section {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		background-color: rgba(234, 234, 234, 0.264);
		padding: 15px;
		margin-top: 20px;
		border-radius: 10px;
	}
	h1 {
		margin-top: 50px;
		font-size: 25px;
		font-family: var(--font-1);
	}
	h2 {
		font-size: 20px;
		color:black;
		font-family: var(--font-2);
	}
	h3 {
		margin-top: 10px;
		font-size: 20px;
		font-family: var(--font-1);
	}
	h4 {
		font-size: 18px;
	}
	button {
		margin-top:20px;
	}
	.check {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		padding: 30px;
	}
	.check span {
		font-size: 40px;
		color: white;
		background-color: rgb(12, 156, 12);
		border-radius: 50%;
		padding:5px;
	}
	.sum {
		border-top: 1px solid black;
		padding-top: 10px;
		margin-bottom: 5px;
	}
	input[type="checkbox"]:disabled, .disabled {
		color: rgb(164, 164, 164) !important
	}
</style>
