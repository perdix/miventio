<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';
	import { dataset_dev } from 'svelte/internal';

	let activity = { tickets: [{}]};
	let showPopup = false;
	let popupTitle = '';

	const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	function getDatesInRange(startDate, endDate) {
		const date = startDate;
		const dates = [];
		while (date <= endDate) {
			dates.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return dates;
	}


	let days = getDatesInRange(new Date($event.start), new Date($event.end))


	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newActivity = (day) => {
		activity = {tickets: [], date: day};
		popupTitle = 'Neuer Programmpunkt';
		togglePopup();
	};

	const editActivity = (act) => {
		activity = act;
		activity.date = activity.date.length > 10 ? activity.date.substring(0,10) : activity.date;
		activity.start = activity.start.length > 5 ? activity.start.substring(11,16) : activity.start;
		if (activity.end != null) {
			activity.end = activity.end.length > 5 ? activity.end.substring(11,16) : activity.end;
		}
		popupTitle = 'Programmpunkt bearbeiten';
		togglePopup();
	};

	const deleteActivity = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/activities/${activity.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedActivity = await res.json();
			$event.activities = $event.activities.filter((a) => a.id != activity.id);
			refreshActivityTickets();
			togglePopup();
		}
	};

	const saveActivity = async () => {
		if ('id' in activity) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/activities/${activity.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(activity)
				}
			);
			if (res.status === 200) {
				const updatedActivity = await res.json();
				$event.activities = $event.activities.map((a) => (a.id == updatedActivity.id ? updatedActivity : a));
				refreshActivityTickets();
				togglePopup();
			}
		} else {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/activities`,
				{
					method: 'POST',
					body: JSON.stringify(activity)
				}
			);
			if (res.status === 201) {
				const newActivity = await res.json();
				$event.activities.push(newActivity);
				$event = $event;
				refreshActivityTickets();
				togglePopup();
			}
		}
	};

	const refreshActivityTickets = async () => {
		// Update event with fresh list of activityTickets
		fetch(`${$page.url.origin}/organisations/${$page.params.organisationId}/events/${$page.params.eventId}/activityTickets`)
		.then((r) => r.json()).then(tickets => {
			$event.activityTickets = tickets;
		});
	}

	const addTicket = () => {
		activity.tickets.push({ clientId: crypto.randomUUID()});
		activity = activity;
	}
	const deleteTicket = (ticket) => {
		if (ticket.id) {
			activity.tickets = activity.tickets.filter(a => a.id != ticket.id);
		} else {
			activity.tickets = activity.tickets.filter(a => a.clientId != ticket.clientId);
		}
	}
</script>

<div class="page">
	<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
		<form class="miventio row" on:submit|preventDefault={saveActivity}>
			<div class="col-2">
				<label for="Name">Programm-ID</label>
				<input id="name" type="text" bind:value={activity.identifier} />
			</div>
			<div class="col-5">
				<label for="Name">Name</label>
				<input id="name" type="text" bind:value={activity.name} required />
			</div>
			<div class="col-5">
				<label for="Name">Referent/Verantwortlicher</label>
				<input id="name" type="text" bind:value={activity.speaker} />
			</div>
			<div class="col-12">
				<label for="description">Beschreibung</label>
				<input id="description" type="text" bind:value={activity.description} />
			</div>
			<div class="col-4">
				<label for="date">Datum</label>
				<input id="date" type="date" bind:value={activity.date} required/>
			</div>
			<div class="col-4">
				<label for="start">Start</label>
				<input id="start" type="time" bind:value={activity.start} required/>
			</div>
			<div class="col-4">
				<label for="end">Ende</label>
				<input id="end" type="time" bind:value={activity.end}/>
			</div>
			<div class="col-3">
				<label for="location">Ort</label>
				<input id="location" type="text" bind:value={activity.location} />
			</div>
			<div class="col-3">
				<label for="location">Raum</label>
				<input id="location" type="text" bind:value={activity.room} />
			</div>
			<div class="col-3">
				<label for="type">Typ</label>
				<input id="type" type="text" bind:value={activity.type} placeholder="Workshop / Vortrag ..." required/>
			</div>
			<div class="col-3">
				<label for="limit">Besucherlimit</label>
				<input id="limit" type="number" bind:value={activity.limit} />
			</div>
			
			<div class="col-12">
				<br><br>
				<div class="mini-header">
					<h2>Zutrittsbeschränkung</h2>
					<button class="icon" on:click|preventDefault={addTicket}>
						<span class="material-symbols-outlined">person_add</span>
					</button>
				</div>
				<div class="mini-content">
					{#each activity.tickets as ticket}
					<div class="row item">
						<div class="col-12">
							<div class="mini-header">
							<h3>Ticket</h3>
							<button class="mini-icon" on:click|preventDefault={() => deleteTicket(ticket)}>
								<span class="material-symbols-outlined">delete</span>
							</button>
							</div>
						</div>
						<div class="col-6">
							<label for="category">Teilnehmer-Kategorie</label>
							<select name="category" id="category" bind:value={ticket.visitorCategoryId}>
								{#each $event.visitorCategories as category}
									<option value={category.id}>{category.name}</option>
								{/each}
							</select>
						</div>
						<div class="col-6">
							<label for="price">Preis in Euro</label>
							<input id="price" type="number" step="0.01" bind:value={ticket.price} required />
						</div>
					</div>
					{/each}
				</div>
			</div>
	
			<div class="col-6 submit">
				<button type="submit">Speichern</button>
			</div>
			<div class="col-6 submit right">
				<button type="button" on:click={deleteActivity}>
					<span class="material-symbols-outlined">delete</span>
				</button>
			</div>
		</form>
	</Popup>

	<Header title={'Programm'}>
	
	</Header>

	<Content>

		{#each days as day}
		<div class="mini-header">
			<h2>{weekdays[day.getDay()]}, {day.toLocaleDateString('de-AT')}</h2>

			<button on:click={() => newActivity(day.toISOString().substring(0,10))}>
				<span>Neuer Programmpunkt</span>
				<span class="material-symbols-outlined">add_circle</span>
			</button>
		</div>
		

		{#if $event.activities.filter(a => a.date.substring(0,10) == day.toISOString().substring(0,10)).length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Zeit</th>
						<th>Anmeldungen</th>
						<th>Ticketvarianten</th>
					</tr>
				</thead>
				<tbody>	
				{#each $event.activities.filter(a => a.date.substring(0,10) == day.toISOString().substring(0,10)) as activity}
					<tr on:click={() => editActivity(activity)}>
						<td>{activity.identifier || ''}</td>
						<td><b>{activity.type || ''}:</b> {activity.name}</td>
						<!-- <td>{activity.speaker || ''}</td> -->
						<!-- <td>{activity.date.substring(0,10)}</td> -->
						<td>{(activity.start.length > 5) ? activity.start.substring(11,16): activity.start} - 
							{#if activity.end}
								{(activity.end.length > 5) ? activity.end.substring(11,16): activity.end}
							{/if}
						</td>
						<td>
					
							{activity.numberOfVisitors || '0'} / {activity.limit || '-'}
					
						</td>
						
						<td>
							{#each activity.tickets as ticket}
								<span class="ticket">
									{ticket.visitorCategory.name||''} | {ticket.price}€
									<!-- {ticket.price}€ -->
								</span>
							{/each}
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
		{:else}
		<p class="info">Noch kein Programm vorhanden</p>
	   {/if}
		<br>
		<br>
		{/each}




	</Content>
</div>

<style>
	h2 {
		font-size: 1.4rem;
		font-weight: 300;
		color: var(--black);
	}
	.ticket {
		background-color: var(--grey);
		color:var(--color-1-dark);
		padding: 5px 8px;
		display: inline-block;
		margin-right: 2px;
		margin-top: 2px;
		font-size: 0.9rem;
	}
	.mini-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item {
		background-color: var(--grey);
		padding: 10px;
		margin-top: 10px;
		border-radius: var(--corner);
	}
	.info {
		padding: var(--unit);
		background-color: var(--white);
	}
	.mini-header button {
		margin-bottom: 15px;
	}
</style>
