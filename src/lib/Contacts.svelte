<script>
	export let contacts = [];
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function edit(contact) {
		dispatch('edit', {
			contact: contact
		});
	}
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Adresse</th>
			<th>E-Mail</th>
			<th>Telefon</th>
			<th>Kategorie</th>
		</tr>
	</thead>
	<tbody>
		{#each contacts as contact}
			<tr on:click={() => edit(contact)}>
				<td>{contact.firstName} {contact.lastName}</td>
				<td
					>{contact.address || ''} <br />
					{contact.postcode || ''}
					{contact.city || ''}</td
				>
				<td>{contact.email || ''}</td>
				<td>{contact.phone || ''}</td>
				<td>
					{#if contact.category}
						{contact.category}
						
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	
</style>
