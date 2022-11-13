<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import { page } from '$app/stores';
	import { event } from '$lib/store/event';
	import Popup from '$lib/Popup.svelte';

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
				$event.visitorCategories.map((c) => (c.id == updatedCategory.id ? updatedCategory : c));
				$event = $event;
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
		<div class="md-12">
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={category.name} required />
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
				</tr>
			
			</thead>
			<tbody>
				{#each $event.visitorCategories as category}
					<tr on:click={() => editCategory(category)}>
						<td>
							{category.name}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Sie können Teilnehmer in Kategorie einteilen, um später unterschiedliche Ticketpreise festzulegen. </p>
	
	{/if}

</Content>

<style>
	p {
		padding: var(--unit);
		background-color: var(--white);
	}
</style>
