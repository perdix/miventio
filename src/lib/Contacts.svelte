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
			<th>Kontaktdaten</th>
			<th>Mitgliedskategorie</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		{#each contacts as contact}
			<tr on:click={() => edit(contact)}>
				<td>{contact.prefix || ''} {contact.firstName} {contact.lastName} {contact.postfix || ''}</td>
				<td>
					{#if contact.company}{contact.company} <br />{/if}
					{#if contact.address}{contact.address} <br />{/if}
					{contact.postcode || ''}
					{contact.city || ''}
					{contact.country || ''}
				</td>
				<td>
					{#if contact.phone}{contact.phone} <br />{/if}
					{#if contact.email} <a href="mailto:{contact.email}">{contact.email}</a><br />{/if}
					{#if contact.website}<a href="{contact.website}" target="_blank" rel="noreferrer">{contact.website}</a>{/if}
				</td>
				<td>
					{#if contact.membership}
					<span class="membership" style="background-color:{contact.membership.color};">
						{contact.membership.name}
					</span>
					{/if}
				</td>
				<td>
					{#if contact.status}
					<span class="status" class:active={contact.status=="AKTIV"} class:inactive={contact.status=="INAKTIV"} class:retired={contact.status=="PENSIONIERT"}>
						{contact.status}
					</span>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>

	.membership {
		padding: 5px 10px;
		font-size: 16px;
		border: 1px solid black;
		font-weight: 300;
	}
	.status {
		border-radius: 30px;
		padding: 5px 10px;
		font-size: 12px;
	}
	.active {
		border: 1px solid var(--color-1-dark);
		background-color: var(--color-1-light);
		color: var(--color-1-dark);
	}
	.inactive {
		border: 1px solid rgb(201, 201, 201);
		color: rgb(201, 201, 201);
		background-color: rgb(250, 250, 250);
	}
	.retired {
		border: 1px solid gray;
		color:rgb(68, 68, 68);
		background-color: var(--lightgrey);
	}
	
</style>
