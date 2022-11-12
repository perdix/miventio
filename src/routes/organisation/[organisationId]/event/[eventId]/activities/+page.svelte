<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';

	let activity = { activityTickets: []};
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

	const newActivity = () => {
		activity = {activityTickets: []};
		popupTitle = 'Neue Aktivität';
		togglePopup();
	};

	const editActivity = (act) => {
		activity = act;
		activity.date = activity.date.length > 10 ? activity.date.substring(0,10) : activity.date;
		activity.start = activity.start.length > 5 ? activity.start.substring(11,16) : activity.start;
		activity.end = activity.end.length > 5 ? activity.end.substring(11,16) : activity.end;
		popupTitle = 'Aktivität bearbeiten';
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
				$event.activites = $event.activities.map((a) => (a.id == updatedActivity.id ? updatedActivity : a));
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
				togglePopup();
			}
		}
	};
	const addTicket = () => {
		activity.activityTickets.push({ participationCategoryId: null, name: ''});
		activity = activity;
	}
	const deleteTicket = (ticket) => {
		let filtered = activity.activityTickets.filter(a => ((a.name != ticket.name) || (a.participationCategory.name != ticket.participationCategory.name)));
		activity.activityTickets = filtered;
	}
</script>

<div class="page">
	<Popup title={popupTitle} show={showPopup} on:close={togglePopup} maxWidth={'900px'}>
		<form class="miventio row" on:submit|preventDefault={saveActivity}>
			<div class="md-6">
				<label for="Name">Name</label>
				<input id="name" type="text" bind:value={activity.name} required />
			</div>
			<div class="md-6">
				<label for="Name">Referent/Verantwortlicher</label>
				<input id="name" type="text" bind:value={activity.speaker} />
			</div>
			<div class="md-12">
				<label for="description">Beschreibung</label>
				<input id="description" type="text" bind:value={activity.description} />
			</div>
			<div class="md-4">
				<label for="start">Datum</label>
				<input id="start" type="date" bind:value={activity.date} required/>
			</div>
			<div class="md-4">
				<label for="start">Start</label>
				<input id="start" type="time" bind:value={activity.start} required/>
			</div>
			<div class="md-4">
				<label for="end">Ende</label>
				<input id="end" type="time" bind:value={activity.end}/>
			</div>
			<div class="md-4">
				<label for="location">Ort</label>
				<input id="location" type="text" bind:value={activity.location} placeholder="Saal 1" />
			</div>
			<div class="md-4">
				<label for="type">Typ</label>
				<input id="type" type="text" bind:value={activity.type} placeholder="Workshop / Vortrag ..." />
			</div>
			<div class="md-4">
				<label for="limit">Limit</label>
				<input id="limit" type="number" bind:value={activity.limit} />
			</div>
			<div class="md-12">
				<br><br>
				<h2 class="ticket-section">
					Tickets
					<span class="material-symbols-outlined add" on:click={addTicket}>add_circle</span>
				</h2>
			</div>
	
		
			{#each activity.activityTickets as ticket}
				<div class="md-1">
					<span class="material-symbols-outlined rm" on:click={() => deleteTicket(ticket)}>delete</span>
				</div>
				<!-- <div class="md-4">
					<label for="name">Name</label>
					<input id="name" type="text" bind:value={ticket.name} />
				</div> -->
				<div class="md-6">
					<label for="category">Teilnehmer-Kategorie</label>
					<select name="category" id="category" bind:value={ticket.participationCategoryId}>
						{#each $event.participationCategories as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</div>
				<div class="md-5">
					<label for="price">Preis in Euro</label>
					<input id="price" type="number" step="0.01" bind:value={ticket.price} required />
				</div>

		
			{/each}
			
	
			<div class="md-6 submit">
				<button type="submit">Speichern</button>
			</div>
			<div class="md-6 submit right">
				<button type="button" on:click={deleteActivity}>
					<span class="material-symbols-outlined">delete</span>
				</button>
			</div>
		</form>
	</Popup>

	<Header title={'Programm'}>
		<button on:click={newActivity}>
			<span>Neue Aktivität</span>
			<span class="material-symbols-outlined">add_circle</span>
		</button>
	</Header>

	<Content>

		{#each days as day}
		<h2>{weekdays[day.getDay()]}, {day.toLocaleDateString('de-AT')}</h2>
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Typ</th>
					<th>Datum</th>
					<th>Zeit</th>
					<th>Besucher-Limit</th>
					<th>Tickets</th>
				</tr>
			</thead>
			<tbody>	
				{#each $event.activities.filter(a => a.date.substring(0,10) == day.toISOString().substring(0,10)) as activity}
					<tr on:click={() => editActivity(activity)}>
						<td>{activity.name}</td>
						<td>{activity.type || ''}</td>
						<td>{activity.date.substring(0,10)}</td>
						<td>{(activity.start.length > 5) ? activity.start.substring(11,16): activity.start} - 
							{(activity.end.length > 5) ? activity.end.substring(11,16): activity.end}</td>

						<td>{activity.limit || '-'}</td>
						<td>
							{#each activity.activityTickets as ticket}
								<span class="ticket">
									{ticket.participationCategory.name||''} | {ticket.price}€
								</span>
							{/each}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<br>
		<br>
		{/each}




	</Content>
</div>

<style>
	h2 {
		font-size: 1.3rem;
		font-weight: 300;
		color: var(--black);
	}
	.ticket-section {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.add, .rm {
		border-radius: 50%;
		display: inline-block;
		padding: 3px;
		color: var(--color-1);
		font-size: 20px;
		cursor: pointer;
		transition: all 0.3s;
	}
	.add:hover, .rm:hover {
		color: var(--color-1-dark);
		transition: all 0.3s;
	}
	.rm {
		margin-top: 45px;
    	margin-left: 30px;
	}
	.ticket {
		background-color: var(--grey);
		color:var(--color-1-dark);
		padding: 5px 8px;
		display: inline-block;
		margin-right: 2px;
		font-size: 0.9rem;
	}
</style>
