<script>
	import Events from '$lib/Events.svelte';
	import { page } from '$app/stores';
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';
	import Popup from '$lib/Popup.svelte';
	import { goto } from '$app/navigation';

	let event = {};
	let showPopup = false;

	const togglePopup = () => {
		showPopup = !showPopup;
	};
	const saveEvent = async () => {
		const res = await fetch(`/organisations/${$page.data.organisation.id}/events`, {
			method: 'POST',
			body: JSON.stringify(event)
		});
		if (res.status === 201) {
			const newEvent = await res.json();
			togglePopup();
			goto(`/organisation/${$page.data.organisation.id}/event/${newEvent.id}`);
		}
	};
</script>

<div class="page">
	<Popup title="Neue Veranstaltung" show={showPopup} on:close={togglePopup}>
		<form class="miventio row" on:submit|preventDefault={saveEvent}>
			<div class="md-12">
				<label for="Name">Name</label>
				<input id="name" type="text" bind:value={event.name} />
			</div>
			<div class="md-12">
				<label for="description">Beschreibung</label>
				<input id="description" type="text" bind:value={event.description} />
			</div>
			<div class="md-6">
				<label for="start">Startdatum</label>
				<input id="start" type="date" bind:value={event.start} />
			</div>
			<div class="md-6">
				<label for="end">Enddatum</label>
				<input id="end" type="date" bind:value={event.end} />
			</div>
			<div class="md-6">
				<label for="location">Location</label>
				<input id="location" type="text" bind:value={event.location} />
			</div>
			<div class="md-6">
				<label for="city">Stadt</label>
				<input id="city" type="text" bind:value={event.city} />
			</div>

			<div class="md-12 submit">
				<button type="submit">Speichern</button>
			</div>
		</form>
	</Popup>

	<!-- <nav class="subnav">
		<div>
			<h2>Crew</h2>
		</div>
		<div>
			<h2>Aussteller</h2>
		</div>
		<div>
			<h2>Hotels</h2>
		</div>
		<div>
			<h2>Lieferanten</h2>
		</div>
		<div>
			<h2>Referenten</h2>
		</div>

	</nav> -->

	<Main>
		<Header title={'Veranstaltungen'}>
			<button on:click={togglePopup}>
				<span>Neue Veranstaltung</span>
				<span class="material-symbols-outlined">add_circle</span>
			</button>
		</Header>

		<Events events={$page.data.events} />
	</Main>
</div>


<style>
	.subnav {
		height: 50px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
	.subnav div {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
	.subnav div h2 {
		font-size: 20px;
	}
	.subnav div:hover {
		cursor: pointer;
		background-color: var(--lightgrey);
	}


</style>