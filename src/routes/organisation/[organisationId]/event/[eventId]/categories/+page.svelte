<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';
	import { visitorTypes } from '$lib/store/constants'

	let category = { };
	let showPopup = false;
	let popupTitle = '';

	const togglePopup = () => {
		showPopup = !showPopup;
	};

	const newCategory = () => {
		category = {};
		popupTitle = 'Neue Kategorie';
		togglePopup();
	};

	const editCategory = (c) => {
		category = c;
		popupTitle = 'Kategorie bearbeiten';
		togglePopup();
	};

	const deleteCategory = async () => {
		const res = await fetch(
			`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/categories/${category.id}`,
			{
				method: 'DELETE'
			}
		);
		if (res.status === 200) {
			const deletedCategory = await res.json();
			$event.visitorCategories = $event.visitorCategories.filter((c) => c.id != category.id);
			togglePopup();
		}
	};

	const saveCategory = async () => {

		if ('id' in category) {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/categories/${category.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(category)
				}
			);
			if (res.status === 200) {
				const updatedCategory = await res.json();
				$event.visitorCategories = $event.visitorCategories.map((c) => (c.id == updatedCategory.id ? updatedCategory : c));
				togglePopup();
			}
		} else {
			const res = await fetch(
				`/organisations/${$page.data.organisation.id}/events/${$page.params.eventId}/categories`,
				{
					method: 'POST',
					body: JSON.stringify(category)
				}
			);
			if (res.status === 201) {
				const newCategory = await res.json();
				$event.visitorCategories.push(newCategory);
				$event = $event;
				togglePopup();
			}
		}
	};
</script>

<Popup title={popupTitle} show={showPopup} on:close={togglePopup}>
	
	<form class="miventio row" on:submit|preventDefault={saveCategory}>
		<div class="md-6">
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={category.name} required />
		</div>
		<div class="md-6">
			<label for="type">Typ</label>
			<select name="type" id="type" bind:value={category.type} required>
				{#each $visitorTypes as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>
		<div class="md-12">
			<label for="desc">Beschreibung</label>
			<input id="desc" type="text" bind:value={category.description} />
		</div>
		<div class="md-6 submit">
			<button type="submit">Speichern</button>

		</div>
		<div class="md-6 submit right">
			<button type="button" on:click={deleteCategory}>
				<span class="material-symbols-outlined">delete</span>
			</button>

		</div>
	</form>
</Popup>

<Header title={'Teilnahmekategorien'}>
	<button on:click={newCategory}>
		<span>Neue Kategorie</span>
		<span class="material-symbols-outlined">add_circle</span>
	</button>
</Header>

<Content>
	{#if $event.visitorCategories.length > 0}
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Typ</th>
					<th>Bechreibung</th>
				</tr>
			
			</thead>
			<tbody>
				{#each $event.visitorCategories as category}
					<tr on:click={() => editCategory(category)}>
						<td>
							{category.name}
						</td>
						<td>
							{category.type}
						</td>
						<td>
							{category.description || ''}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Veranstaltungsteilnehmer werden in Kategorien unterteilt (z.B. Student, Ehrengast, Allgemein, ...). </p>
	
	{/if}

</Content>

<style>
	p {
		padding: var(--unit);
		background-color: var(--white);
	}
</style>
